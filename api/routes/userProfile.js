const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const JobApplicant = require("../../models/Job_Applicants");
const JobRecruiter = require("../../models/Job_Recruiters");

// @route PUT api/profile/applicant/:id
// @desc Update the user info
// @access private
router.put("/applicant/:id", auth, (req, res) => {
    const user = req.body;

    if (!user)
        return res.status(400).json({ msg: "No user information provided" });

    const query = { _id: req.params.id };

    JobApplicant.findOneAndUpdate(query, user)
        .then(() => res.json(req.body))
        .catch((err) => res.status(404).json(err));
});

// @route PUT api/profile/recruiter/:id
// @desc Update the user info
// @access private
router.put("/recruiter/:id", auth, (req, res) => {
    const user = req.body;

    if (!user)
        return res.status(400).json({ msg: "No user information provided" });

    const query = { _id: req.params.id };

    JobRecruiter.findOneAndUpdate(query, user)
        .then(() => res.json(true))
        .catch((err) => res.status(404).json(err));
});

module.exports = router;
