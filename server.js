const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));