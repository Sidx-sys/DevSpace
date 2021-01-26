const { Schema } = require("mongoose");

mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  applicant_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  applicant_name: {
    type: "String",
  },
  recruiter_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date_of_app: {
    type: String,
    required: true,
  },
  sop: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    default: "Applied",
  },
  date_of_join: {
    type: String,
  },
  rated: {
    type: Boolean,
    default: false,
  },
  rated_app: {
    type: Boolean,
    default: false,
  },
});

module.exports = Application = mongoose.model(
  "applications",
  ApplicationSchema
);
