const express = require('express');
const { createExam, allExams } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(allExams)

module.exports = examRouter;