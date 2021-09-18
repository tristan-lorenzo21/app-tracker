const { findOne } = require('../models/User');
const User = require('../models/User');

// "next" is used for error handling
// this is the register route
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        res.status(201).json({
            success: true, 
            user
        });
        // logs user into console
        console.log(user);
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error.message,
        });
    }
};

// this is the login route
exports.login = async (req, res, next) => {
    // we need to get an email and password from the form to login the user
    const { email, password } = req.body;

    // checks if email or password is filled in the backend
    if (!email || !password) {
        res.status(400).json({success: false, error: "Please provide an email and password"})
    };

    try {
        const user = await User.findOne({ email }).select("+password");

        // if we dont get a user back, send an error message
        if (!user) {
            res.status(404).json({success: false, error: "Invalid Credentials"})
        }

        // compare password if it matches
        const isMatch = await user.matchPasswords(password);

        // checks if the passwords match 
        if (!isMatch) {
            res.status(404).json({success: false, error: "Invalid Password"});
        };

        res.status(200).json({
            success: true, 
            token: "123fgh"
        });
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