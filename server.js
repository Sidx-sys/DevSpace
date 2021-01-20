const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const register = require("./api/routes/register");
const login = require("./api/routes/login");
const userProfile = require("./api/routes/userProfile");
const jobRoute = require("./api/routes/jobRoute");
const applicationRoute = require("./api/routes/applicationRoute");

const app = express();
app.use(express.json());
app.use(cors());

const db = config.get("MongoURI");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log(err));

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", userProfile);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
