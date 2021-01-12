const { SchemaType, SchemaTypes } = require("mongoose");

mongoose = require("mongoose")

const JobApplicantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    academics: {
        type: Array,
    },
    skills: {
        type: Array,
    },
    rating: {
        type: Array,
    }
});

module.exports = JobApplicant = mongoose.model("job_applicant", JobApplicantSchema);