const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const JobApplicant = require("../../models/Job_Applicants");
const JobRecruiter = require("../../models/Job_Recruiters");
const Job = require("../../models/Job");
const Application = require("../../models/Application");

// @route GET api/profile/applicant/:id
// @desc Get applicant info
// @access private
router.get("/applicant/:id", auth, async (req, res) => {
  const _id = req.params.id;

  const user = await JobApplicant.find({ _id }).catch((err) =>
    res.status(404).json(err)
  );
  res.json(user);
});

// @route PUT api/profile/applicant/:id
// @desc Update applicant info
// @access private
router.put("/applicant/:id", auth, (req, res) => {
  const user = req.body;

  if (!user)
    return res.status(400).json({ msg: "No user information provided" });

  const query = { _id: req.params.id };
  const query2 = { applicant_id: req.params.id };

  JobApplicant.findOneAndUpdate(query, user)
    .then(() => {
      Application.updateMany(query2, {
        $set: { applicant_name: user.name },
      })
        .then(() => res.json(true))
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

// @route PUT api/profile/recruiter/:id
// @desc Update recruiter info
// @access private
router.put("/recruiter/:id", auth, (req, res) => {
  const user = req.body;

  if (!user)
    return res.status(400).json({ msg: "No user information provided" });

  const query = { _id: req.params.id };
  const query2 = { recruiter_id: req.params.id };

  JobRecruiter.findOneAndUpdate(query, user)
    .then(() => {
      Job.updateMany(query2, {
        $set: { recruiter_name: user.name },
      })
        .then(() => res.json(true))
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
