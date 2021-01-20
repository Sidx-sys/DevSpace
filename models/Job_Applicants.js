mongoose = require("mongoose");

const JobApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    academics: {
        type: Array,
    },
    skills: {
        type: Array,
    },
    rating: {
        type: Array,
    },
    type: {
        type: String,
        default: "applicant",
    },
    selected: {
        type: Boolean,
        default: false,
    },
    applied_to: {
        type: Number,
        default: 0,
    },
});

module.exports = JobApplicant = mongoose.model(
    "job_applicant",
    JobApplicantSchema
);
