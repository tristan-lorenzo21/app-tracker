const { find } = require('../models/Application');
const Application = require('../models/Application');
const ErrorResponse = require('../utils/errorResponse');

exports.createApplication = async (req, res, next) => {
    const { username, company, position, stage, status, comments, dateApplied } = req.body;

    try {
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