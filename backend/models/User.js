const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Please provide a username"], 
        unique: true, 
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

// checks if password was modified, otherwise, follow through
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }


    // hashes password then saves it to the model
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// this function receives a password from the user
UserSchema.methods.matchPasswords = async function(password) {
    // compares the password that is inputed to the one that is pulled from the database
    // this.password refers to the password selected from the user database
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;