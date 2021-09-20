const { findOne } = require('../models/User');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const errorResponse = require('../utils/errorResponse');

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
exports.forgotPassword = (req, res, next) => {
    res.send("Forgot password route");
};

// this is the reset password route
exports.resetPassword = (req, res, next) => {
    res.send("Reset password route");
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token});
}