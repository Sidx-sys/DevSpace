const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth")

const JobApplicant = require("../../models/Job_Applicants");
const JobRecruiter = require("../../models/Job_Recruiters");

// @route POST api/login/app
// @desc Login an existing job applicant
// @access public
router.post("/app", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: "All fields are not filled" })

    JobApplicant.findOne({ email }).then((applicant) => {
        if (!applicant) {
            return res.status(400).json({ msg: "Email not found" });
        }

        bcrypt.compare(password, applicant.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ msg: "Invalid Password" });

            jwt.sign(
                { id: applicant._id },
                config.get("jwtSecret"),
                {
                    expiresIn: 7600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        applicant: {
                            id: applicant._id,
                            name: applicant.name,
                            email: applicant.email,
                            academics: applicant.academics,
                            skills: applicant.skills,
                            rating: applicant.rating
                        },
                    });
                }
            );
        });
    })
})

// @route api/login/app
// @desc GET job applicant data
// @access Private
router.get("/app", auth, (req, res) => {
    JobApplicant
        .findById(req.user.id)
        .select("-password")
        .then(user => res.json(user));
});

// @route POST api/login/rec
// @desc Login an existing recruiter
// @access public
router.post("/rec", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: "All fields are not filled" })

    JobRecruiter.findOne({ email }).then((recruiter) => {
        if (!recruiter) {
            return res.status(400).json({ msg: "Email not found" });
        }

        bcrypt.compare(password, recruiter.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ msg: "Invalid Password" });

            jwt.sign(
                { id: recruiter._id },
                config.get("jwtSecret"),
                {
                    expiresIn: 7600,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token,
                        recruiter: {
                            id: recruiter._id,
                            name: recruiter.name,
                            email: recruiter.email,
                            contact: recruiter.contact,
                            bio: recruiter.bio,
                            rating: recruiter.rating
                        },
                    });
                }
            );
        });
    })
})

// @route api/login/rec
// @desc GET recruiter data
// @access Private
router.get("/rec", auth, (req, res) => {
    JobRecruiter
        .findById(req.recruiter.id)
        .select("-password")
        .then(user => res.json(user));
});

module.exports = router;