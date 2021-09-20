const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.mssage;

    // console.log(err);

    // in Mongoose, this means that there has been a duplicate key error
    if(err.code === 11000) {
        const message = `Duplicate Field Value Entered`;
        error = new ErrorResponse(message, 400);
    }

    if(err.name === "ValidationError") {
        // console log each process to understand what is going on
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false, 
        error: err.message || "Server Error"
    });

}

module.exports = errorHandler;