const { find } = require('../models/Application');
const Application = require('../models/Application');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/auth');
const auth = require('./auth');

exports.createApplication = async (req, res, next) => {
    const { company, position, stage, status, comments, dateApplied } = req.body;

    // const user = auth.

    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Bearer 3489sdf0n9s8fs09d
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;

        const username = user.username;

        // adding application logic
        const application = await Application.create({
            username, 
            company, 
            position, 
            stage, 
            status, 
            comments, 
            dateApplied
        });

        console.log(application);
        next();

        res.status(201).json({ success: true, data: "Application created!" })
    } catch (error) {
        next(error);
    }
}

exports.displayApplications = async (req, res, next) => {
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;

        const username = user.username;
        const userApplications = await Application.find({username: username})
        res.status(200).json({ message: "Display applications route", userApplications });
    } catch (error) {
        next(error);
    }
}

exports.deleteApplication = async (req, res, next) => {
    // res.status(200).json({ message: "Delete application route" });
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;
        
        const application = await Application.findByIdAndDelete(req.params.id);

        console.log(application);

        res.status(200).json({ message: `Application for ${user.username} at ${application.company} has been deleted`, application });
    } catch (error) {
        next(error);
    }
}

exports.updateApplication = (req, res, next) => {
    res.status(200).json({ message: "Update application route" });
}