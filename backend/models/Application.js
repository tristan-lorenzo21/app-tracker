const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    dateApplied: {
        type: Date,
        required: true
    },
    companyLogo: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/512/188/188391.png"
    },
    applicationLink: {
        type: String,
    },
}, {
    timestamps: true,
});

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;