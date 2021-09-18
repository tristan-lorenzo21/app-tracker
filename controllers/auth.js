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
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error.message,
        });
    }
};

// this is the login route
exports.login = (req, res, next) => {
    res.send("Login route");
};

// this is the forgot password route
exports.forgotPassword = (req, res, next) => {
    res.send("Forgot password route");
};

// this is the reset password route
exports.resetPassword = (req, res, next) => {
    res.send("Reset password route");
};