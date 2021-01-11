const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const JobApplicant = require("../../models/Job_Applicants");
const JobRecruiter = require("../../models/Job_Recruiters");

// @route api/register/app
// @desc Register a new Applicant
// @access public
router.post("/app", (req, res) => {
    const { name, email, password, institution, start_year, end_year, skills } = req.body;

    JobApplicant.findOne({ email }).then((applicant) => {
        if (applicant) {

            return res.status(400);
        }
        const newApplicant = new JobApplicant({
            name,
            email,
            password,
            institution,
            start_year,
            end_year,
            skills
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newApplicant.password, salt, (err, hash) => {
                if (err) throw err;
                newApplicant.password = hash;
                newApplicant.save().then((applicant) => {
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
            });
        });
    })
})

// @route api/register/rec
// @desc Register a new Recruiter
// @access public
router.post("/rec", (req, res) => {
    const { name, email, password, contact, bio } = req.body;

    JobRecruiter.findOne({ email }).then((recruiter) => {
        if (recruiter) {
            return res.status(400);
        }
        const newRecruiter = new JobRecruiter({
            name,
            email,
            password,
            contact,
            bio
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newRecruiter.password, salt, (err, hash) => {
                if (err) throw err;
                newRecruiter.password = hash;
                newRecruiter.save().then((recruiter) => {
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
            });
        });
    })
})

module.exports = router;