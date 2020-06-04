const express = require("express");
const apiRouter = express.Router();
const createError = require("http-errors");
const Question = require("./../models/question");

/* GET all questions  */
apiRouter.get("/", function (req, res, next) {
  Question.find()
    .then((question) => {
      res.status(200).json(question);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = apiRouter;
