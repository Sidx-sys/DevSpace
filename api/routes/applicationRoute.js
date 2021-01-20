const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Application = require("../../models/Application");
const JobApplicant = require("../../models/Job_Applicants");
const Job = require("../../models/Job");

// @route api/application
// @desc add an application
// @access Private
router.post("/", auth, async (req, res) => {
  const { applicant_id, job_id } = req.body.data;
  let applied = req.body.applied;

  const newApplication = new Application({
    ...req.body.data,
  });

  const app = await newApplication
    .save()
    .catch((err) => res.status(404).json(err));

  const applicant = await JobApplicant.findOne({ _id: applicant_id });
  await JobApplicant.findOneAndUpdate(
    { _id: applicant_id },
    {
      $set: { applied_to: applicant.applied_to + 1 },
    }
  ).catch((err) => res.status(404).json(err));

  applied.push(applicant_id);
  await Job.findOneAndUpdate(
    { _id: job_id },
    {
      $set: { applied },
    }
  ).catch((err) => res.status(404).json(err));

  res.json(true);
});

module.exports = router;
