const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Please provide a username"]
    },
    email: {
        type: String, 
        required: [true, "Please provide an email"],
        unique: true, 
        match: [
            // checks if email is valid
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ]
    }, 
    password: {
        type: String, 
        required: [true, "Please provide a password"],
        minlength: 6, 
        // when a user is queried, if select is set to false, the password is not included in query
        select: false
    },
    resetPasswordToken: String, 
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    // the higher the number, the more secure it is, but 10 should be fine
    const salt = await bcrypt.genSalt(10);

    // saves password in the password field, and then the document gets saved
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;