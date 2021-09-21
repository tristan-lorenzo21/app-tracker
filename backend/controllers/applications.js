const { find } = require('../models/Application');
const Application = require('../models/Application');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const protect = require('../middleware/auth');
const auth = require('./auth');

exports.createApplication = async (req, res, next) => {
    const { username, company, position, stage, status, comments, dateApplied } = req.body;

    // const user = auth.

    const token = localStorage.getItem("token");

    console.log(token);

    try {
        // const user = await User.find
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

exports.displayApplications = (req, res, next) => {
    res.status(200).json({ message: "Display applications route" });
}

exports.deleteApplication = (req, res, next) => {
    res.status(200).json({ message: "Delete application route" });
}

exports.updateApplication = (req, res, next) => {
    res.status(200).json({ message: "Update application route" });
}