const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");
const nodemailer = require("nodemailer");

const Application = require("../../models/Application");
const JobApplicant = require("../../models/Job_Applicants");
const Job = require("../../models/Job");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: config.get("EMAIL_ID"),
    pass: config.get("EMAIL_PASS"),
  },
});

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

// @route PUT api/application/accept/:id
// @desc Update the application stage to accepted,
// @access private
router.put("/accept", auth, async (req, res) => {
  try {
    const application = req.body;
    const _id = application._id;
    const join_date = application.date_of_joining;

    await Application.findOneAndUpdate(
      { _id },
      {
        $set: {
          date_of_join: join_date,
          stage: "Accepted",
        },
      }
    ).exec();

    const job_id = application.job_id;
    const applicant_id = application.applicant_id;

    await JobApplicant.findOneAndUpdate(
      { _id: applicant_id },
      {
        $set: { got_job: job_id },
      }
    );

    const job = await Job.findById(job_id).catch((err) =>
      res.status(404).json(err)
    );
    let newSelected = job.selected;
    newSelected.push(applicant_id);

    await Job.findOneAndUpdate(
      { _id: job_id },
      {
        $set: { selected: newSelected },
      }
    );

    const allApp = await Application.find({
      applicant_id: application.applicant_id,
    }).exec();

    for (let id = 0; id < allApp.length; id++) {
      const a = allApp[id];
      if (a.stage === "Accepted" || a.stage === "Rejected") continue;

      await Application.findOneAndUpdate(
        { _id: a._id },
        {
          $set: { stage: "Rejected" },
        }
      );

      const applicant = await JobApplicant.findOne({
        _id: a.applicant_id,
      });
      await JobApplicant.findOneAndUpdate(
        { _id: a.applicant_id },
        {
          $set: { applied_to: applicant.applied_to - 1 },
        }
      );
    }

    const mailOptions = {
      from: "devspacenotifs@gmail.com",
      to: application.email,
      subject: `Application Accepted for ${job.title} !`,
      html: `Congratulations ${application.applicant_name}! <br/> Your job application for the job posting of <strong>${job.title}</strong> has been accepted.`,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log(res);

    return res.json(true);
  } catch (err) {
    return res.status(404).json(err);
  }
});

// @route PUT api/application/reject
// @desc Update the application stage to rejected,
// @access private
router.put("/reject", auth, async (req, res) => {
  const application = req.body;

  await Application.findOneAndUpdate(
    { _id: application._id },
    {
      $set: { stage: "Rejected" },
    }
  ).catch((err) => res.status(404).json(err));

  const applicant = await JobApplicant.findOne({
    _id: application.applicant_id,
  });
  await JobApplicant.findOneAndUpdate(
    { _id: application.applicant_id },
    {
      $set: { applied_to: applicant.applied_to - 1 },
    }
  ).catch((err) => res.status(404).json(err));

  res.json(true);
});

// @route PUT api/application/rated
// @desc Update the application stage to rejected,
// @access private
router.put("/rated/:id", auth, async (req, res) => {
  const _id = req.params.id;
  await Application.findOneAndUpdate(
    { _id },
    {
      $set: { rated: true },
    }
  ).catch((err) => res.status(404).json(err));

  res.json(true);
});

// @route GET api/application/rec/accept/:id
// @desc To get all applications of a recruiter
// @access private
router.get("/rec/accept/:id", auth, async (req, res) => {
  const recruiter_id = req.params.id;

  const applications = await Application.find({ recruiter_id }).catch((err) =>
    res.status(404).json(err)
  );

  const accApplications = applications.filter(
    (app) => app.stage === "Accepted"
  );

  const accApplicationsWithJob = await Promise.all(
    accApplications.map(async (app) => {
      const job = await Job.findById(app.job_id).select("-password");

      return {
        ...job._doc,
        ...app._doc,
      };
    })
  );

  const accApplicationJobWithUser = await Promise.all(
    accApplicationsWithJob.map(async (app) => {
      const user = await JobApplicant.findById(app.applicant_id).select(
        "-password"
      );

      return {
        ...app,
        rating: user._doc.rating,
      };
    })
  );

  res.json(accApplicationJobWithUser);
});

module.exports = router;
