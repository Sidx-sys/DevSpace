mongoose = require("mongoose")

const JobRecruiterSchema = new mongoose.Schema({
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
    contact: {
        type: String,
    },
    bio: {
        type: String,
    },
    rating: {
        type: Array,
    }
})

module.exports = JobRecruiter = mongoose.model("job_recruiter", JobRecruiterSchema);