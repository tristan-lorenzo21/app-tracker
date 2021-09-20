const { findOne } = require('../models/User');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
// const errorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// "next" is used for error handling
// this is the register route
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
        // logs user into console
        console.log(user);
    } catch (error) {
        next(error);
    }
};

// this is the login route
exports.login = async (req, res, next) => {
    // we need to get an email and password from the form to login the user
    const { email, password } = req.body;

    // checks if email or password is filled in the backend
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    };

    try {
        const user = await User.findOne({ email }).select("+password");

        // if we dont get a user back, send an error message
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        // compare password if it matches
        const isMatch = await user.matchPasswords(password);

        // checks if the passwords match 
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        };

        sendToken(user, 200, res);
    } catch (error){
        res.status(500).json({
            success: false, 
            error: error.message
        })
    }

};

// this is the forgot password route
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({email});

        if(!user) {
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = user.getResetPasswordToken();

        // saves newly created token to the user
        await user.save();

        // domain of frontend
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({ success: true, data: "Email sent!" })

        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }

    } catch (error) {
        next(error);
    }
};

// this is the reset password route
exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400))
        };

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            sucess: true,
            data: "Password Reset Success"
        })
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token});
};