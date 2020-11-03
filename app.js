const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
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

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please fill this title field"],
  },
  content: {
    type: String,
    required: [true, "Please fill this content field"],
  },
});

const ArticleModel = mongoose.model("Article", articleSchema);

app
  .route("/articles")
  .get((req, res) => {
    ArticleModel.find((err, result) => {
      err ? res.send(err) : res.send(result);
    });
  })
  .post((req, res) => {
    const post = new ArticleModel({
      title: req.body.title,
      content: req.body.content,
    });

    post.save((err) =>
      err ? res.send(err) : res.send("Succesfully added a article")
    );
  })
  .delete((req, res) => {
    ArticleModel.deleteMany((err) =>
      err ? res.send(err) : res.send("Sucessfully deleted all articles")
    );
  });

app.route("/articles/:title").get((req, res) => {
  ArticleModel.findOne({ title: req.params.title }, (err, result) => {
    result ? res.send(result) : res.send("Article not found");
  });
});

app.listen(port, () => console.log(`Server is running on ${port}`));
