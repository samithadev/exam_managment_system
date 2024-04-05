const express = require('express');
const { getQuestion } = require('../application/features/question');

const questionRouter = express.Router();

questionRouter.route("/:id").get(getQuestion)

module.exports = questionRouter;