const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Application = require("../../models/Application");
const JobApplicant = require("../../models/Job_Applicants");
const Job = require("../../models/Job");
const { application } = require("express");

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

// @route GET api/application/app/:id
// @desc To get all applications of an applicant
// @access private

router.get("/app/:id", auth, async (req, res) => {
  const applicant_id = req.params.id;

  const applications = await Application.find({ applicant_id }).catch((err) =>
    res.status(404).json(err)
  );
  res.json(applications);
});

// @route GET api/application/app/:id
// @desc To get all applications of an applicant
// @access private

router.get("/app/:id", auth, async (req, res) => {
  const applicant_id = req.params.id;

  const applications = await Application.find({ applicant_id }).catch((err) =>
    res.status(404).json(err)
  );

  res.json(applications);
});

// @route GET api/application/rec/:id
// @desc To get all applications given to a recruiter of a particular job listing
// @access private

router.get("/rec/:id", auth, async (req, res) => {
  const job_id = req.params.id;

  const applications = await Application.find({ job_id })
    .exec()
    .catch((err) => res.status(404).json(err));

  const applicationWithUser = await Promise.all(
    applications.map(async (app) => {
      const user = await JobApplicant.findById(app.applicant_id).select(
        "-password"
      );

      return {
        ...user._doc,
        ...app._doc,
      };
    })
  );

  res.json(applicationWithUser);
});

// @route PUT api/application/shorlist/:id
// @desc Update the application stage to shortlist,
// @access private
router.put("/shortlist/:id", auth, async (req, res) => {
  const _id = req.params.id;

  await Application.findOneAndUpdate(
    { _id },
    {
      $set: { stage: "Shortlisted" },
    }
  ).catch((err) => res.status(404).json(err));

  res.json(true);
});

module.exports = router;
