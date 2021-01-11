const { Schema } = require("mongoose")

mongoose = require("mongoose")

const ApplicationSchema = new mongoose.Schema({
    job_id: {
        type: Schema.Types.ObjectId,
        required: true
    },

})