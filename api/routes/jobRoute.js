const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Job = require("../../models/Job");
const JobApplicant = require("../../models/Job_Applicants");
const Application = require("../../models/Application");

// @route POST api/job/
// @desc Add a job listing
// @access Private
router.post("/", auth, (req, res) => {
  const { skills_required } = req.body;

  if (!skills_required.length)
    return res
      .status(400)
      .json({ msg: "Please add required skills for the job listing" });

  const newJob = new Job({
    ...req.body,
  });

  newJob
    .save()
    .then((job) => res.json(job._id))
    .catch((err) => {
      res.status(404).json(err);
    });
});

// @route GET api/job/
// @desc Retrieve all the jobs for the applicants
// @access Private
router.get("/", auth, (req, res) => {
  Job.find()
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(404).json(err));
});

// @route GET api/job/rec/:id
// @desc Retrieve recruiter specific jobs
// @access Private
router.get("/rec/:id", auth, (req, res) => {
  const recruiter_id = req.params.id;

  Job.find({ recruiter_id })
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(404).json(err));
});

// @route PUT api/job/:id
// @desc Update job details
// @access Private
router.put("/:id", auth, (req, res) => {
  const job = req.body;

  Job.findOneAndUpdate({ _id: job._id }, job)
    .then(res.json(true))
    .catch((err) => res.status(404).json(err));
});

// @route DELETE api/job/:id
// @desc delete a job
// @access Private
router.delete("/:id", auth, async (req, res) => {
  const job_id = req.params.id;

  const job = await Job.findOneAndDelete({ _id: job_id }).catch((err) =>
    res.status(404).json(err)
  );

  //delete all the applications
  await Application.deleteMany({ job_id }).catch((err) =>
    res.status(404).json(err)
  );

  for (let id = 0; id < job.applied.length; id++) {
    const app_id = job.applied[id];

    const applicant = await JobApplicant.findOne({ _id: app_id }).catch((err) =>
      res.status(404).json(err)
    );

    await JobApplicant.findOneAndUpdate(
      { _id: app_id },
      {
        $set: { applied_to: applicant.applied_to - 1 },
      }
    ).catch((err) => res.status(404).json(err));

    // if applicant was employed at this job
    if (job.selected.includes(app_id)) {
      await JobApplicant.findOneAndUpdate(
        { _id: app_id },
        {
          $set: { got_job: "" },
        }
      ).catch((err) => res.status(404).json(err));
    }
  }

  res.json(true);
});

// @route GET api/job/info/:id
// @desc get a specific job's details
// @access Private
router.get("/info/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const job = await Job.findById(_id).catch((err) => res.status(404).json(err));

  res.json(job);
});

module.exports = router;
