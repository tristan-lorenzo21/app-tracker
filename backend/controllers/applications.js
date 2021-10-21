const { find } = require('../models/Application');
const Application = require('../models/Application');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/auth');
const auth = require('./auth');
const axios = require('axios');

// route that creates applications
exports.createApplication = async (req, res, next) => {
    const { company, position, stage, status, comments, dateApplied } = req.body;

    // const user = auth.

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Bearer 3489sdf0n9s8fs09d
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;

        const username = user.username;

        const companyData = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`);
        const companyLogo = companyData.data[1].logo;

        // adding application logic
        const application = await Application.create({
            username,
            company,
            position,
            stage,
            status,
            comments,
            dateApplied,
            companyLogo
        });

        console.log(application);
        next();

        res.status(201).json({ success: true, data: "Application created!" })
    } catch (error) {
        next(error);
    }
}

// route that displays logged in user's applications
exports.displayApplications = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        req.user = user;

        const username = user.username;
        const userApplications = await Application.find({ username: username })
        res.status(200).json({ message: `Application route for ${username}`, userApplications });
    } catch (error) {
        next(error);
    }
}

// route that deletes a selected application
exports.deleteApplication = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if (!user) {
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

// route that updates a selected application
exports.updateApplication = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // Bearer 3489sdf0n9s8fs09d
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    try {
        // getting user's information
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new ErrorResponse("No user found with this id", 404));
        }

        const updatedApplication = await Application.findByIdAndUpdate(req.params.id,
            {
                status: req.body.updatedStatus,
                comments: req.body.updatedComments,
                company: req.body.updatedCompany,
            }
        );

        console.log(updatedApplication);
        next();

        res.status(201).json({ success: true, data: "Application updated!" })
    } catch (error) {
        next(error);
    }
}