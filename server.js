const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const register = require("./api/routes/reg_applicant")
const login = require("./api/routes/login_applicant")

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
    .catch((err) => console.log(err))

app.use("/api/register", register)
app.use("/api/login", login)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));