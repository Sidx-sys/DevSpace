mongoose = require("mongoose")

const JobApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    institution: {
        type: Array,
        required: true
    },
    start_year: {
        type: Array,
        required: true,
    },
    end_year: {
        type: Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    rating: {
        type: Number
    }
});

module.exports = JobApplicant = mongoose.model("job_applicant", JobApplicantSchema);