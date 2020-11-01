const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb://localhost:27017/wikiDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("Database is running"))
);

app.listen(port, () => console.log(`Server is running on ${port}`));
