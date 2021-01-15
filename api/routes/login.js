const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const JobApplicant = require("../../models/Job_Applicants");
const JobRecruiter = require("../../models/Job_Recruiters");

// @route POST api/login/
// @desc Login an existing user
// @access public
router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: "All fields are not filled" });

    JobApplicant.findOne({ email }).then((applicant) => {
        if (!applicant) {
            JobRecruiter.findOne({ email }).then((recruiter) => {
                if (!recruiter)
                    return res.status(400).json({ msg: "Email not found" });

                bcrypt.compare(password, recruiter.password).then((isMatch) => {
                    if (!isMatch)
                        return res
                            .status(400)
                            .json({ msg: "Invalid Credentials" });

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
                                user: {
                                    id: recruiter._id,
                                    name: recruiter.name,
                                    email: recruiter.email,
                                    contact: recruiter.contact,
                                    bio: recruiter.bio,
                                    rating: recruiter.rating,
                                    type: recruiter.type,
                                },
                            });
                        }
                    );
                });
            });
        } else {
            bcrypt.compare(password, applicant.password).then((isMatch) => {
                if (!isMatch)
                    return res.status(400).json({ msg: "Invalid Credentials" });

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
                            user: {
                                id: applicant._id,
                                name: applicant.name,
                                email: applicant.email,
                                academics: applicant.academics,
                                skills: applicant.skills,
                                rating: applicant.rating,
                                type: applicant.type,
                            },
                        });
                    }
                );
            });
        }
    });
});

// @route GET api/login/
// @desc GET job applicant data
// @access Private
router.get("/", auth, (req, res) => {
    JobApplicant.findById(req.user.id)
        .select("-password")
        .then((user) => {
            if (user) res.json(user);
            else {
                JobRecruiter.findById(req.user.id)
                    .select("-password")
                    .then((user) => res.json(user));
            }
        });
});

// @route POST api/login/tokenIsValid
// @desc checks if a given token is valid or not
// @access public

router.post("/tokenIsValid", (req, res) => {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.get("jwtSecret"));
    if (!verified) return res.json(false);

    JobApplicant.findById(verified.id).then((user) => {
        if (!user) {
            JobRecruiter.findById(verified.id).then((user) => {
                if (!user) return res.json(false);

                return res.json(true);
            });
        }
    });
});

module.exports = router;
