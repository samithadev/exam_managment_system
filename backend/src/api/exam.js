const express = require('express');
const { createExam, allExams, deleteExam } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(allExams)
examRouter.route("/:id").delete(deleteExam)

module.exports = examRouter;