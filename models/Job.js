const { SchemaTypes } = require("mongoose");

mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    recruiter_id: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    app_limit: {
        type: Number,
        required: true,
    },
    job_limit: {
        type: Number,
        required: true,
    },
    posting_date: {
        type: String,
    },
    deadline_date: {
        type: String,
        required: true,
    },
    skills_required: {
        type: Array,
        required: true,
    },
    job_type: {
        type: String,
        required: true,
    },
    Duration: {
        type: Number,
        default: 0,
    },
    spm: {
        type: Number,
        required: true,
    },
    applied: {
        type: Array,
    },
    status: {
        type: String,
        default: "empty",
    },
    rating: {
        type: Array,
        default: [],
    },
});

module.exports = Job = mongoose.model("job", JobSchema);
