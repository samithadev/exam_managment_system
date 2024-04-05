const express = require('express');
const { getAnswers } = require('../application/features/answers');

const answerRouter = express.Router();

answerRouter.route("/:id").get(getAnswers)

module.exports = answerRouter;