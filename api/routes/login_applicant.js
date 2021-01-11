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

    JobApplicant.findOne({ email }).then((applicant) => {
        if (!applicant) {
            return res.status(400);
        }

        bcrypt.compare(password, applicant.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ password: "Invalid Email or Password", email: "" });

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
                            institution: applicant.institution,
                            start_year: applicant.start_year,
                            end_year: applicant.end_year,
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

    JobRecruiter.findOne({ email }).then((recruiter) => {
        if (!recruiter) {
            return res.status(400);
        }

        bcrypt.compare(password, recruiter.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({ password: "Invalid Email or Password", email: "" });

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
                            bio: recruiter.bio
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