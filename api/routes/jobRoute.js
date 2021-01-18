const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Job = require("../../models/Job");

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

module.exports = router;
