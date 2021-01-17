const { SchemaType, SchemaTypes } = require("mongoose");

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
        type: Date,
        default: Date.now,
    },
    deadline_date: {
        type: Date,
        required: true,
    },
    skills_required: {
        type: Array,
        required: true,
    },
    job_type: {
        type: string,
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
    rating: {
        type: Number,
    },
});

module.exports = Job = mongoose.model("job", JobSchema);
