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
    const { name, email, password, password2 } = req.body;

    if (!email || !name || !password || !password2)
        return res.status(400).json({ msg: "All fields are not filled" });
    if (password.length < 5)
        return res.status(400).json({
            msg: "Password length has to be greater than 5 characters",
        });
    if (password !== password2)
        return res
            .status(400)
            .json({ msg: "Confirmed password doesn't match" });

    JobRecruiter.findOne({ email }).then((recruiter) => {
        if (recruiter) {
            return res
                .status(400)
                .json({ msg: "User already exists as Recruiter" });
        }

        JobApplicant.findOne({ email }).then((applicant) => {
            if (applicant) {
                return res
                    .status(400)
                    .json({ msg: "Applicant already exists" });
            }
            const newApplicant = new JobApplicant({
                name,
                email,
                password,
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
                                        academics: applicant.academics,
                                        skills: applicant.skills,
                                        rating: applicant.rating,
                                    },
                                });
                            }
                        );
                    });
                });
            });
        });
    });
});

// @route api/register/rec
// @desc Register a new Recruiter
// @access public
router.post("/rec", (req, res) => {
    const { name, email, password, password2, contact } = req.body;

    if (!email || !name || !password || !password2 || contact)
        return res.status(400).json({ msg: "All fields are not filled" });
    if (password.length < 5)
        return res.status(400).json({
            msg: "Password length has to be greater than 5 characters",
        });
    if (password !== password2)
        return res
            .status(400)
            .json({ msg: "Confirmed password doesn't match" });
    if (contact.length !== 10)
        return res.status(400).json({ msg: "Invalid contact number" });

    JobApplicant.findOne({ email }).then((applicant) => {
        if (applicant) {
            return res
                .status(400)
                .json({ msg: "User already exists as Applicant" });
        }
        JobRecruiter.findOne({ email }).then((recruiter) => {
            if (recruiter) {
                return res.status(400).json({ msg: "User already present" });
            }
            const newRecruiter = new JobRecruiter({
                name,
                email,
                password,
                contact,
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
                                        bio: recruiter.bio,
                                        rating: recruiter.rating,
                                    },
                                });
                            }
                        );
                    });
                });
            });
        });
    });
});

module.exports = router;
