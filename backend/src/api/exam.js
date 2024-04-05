const express = require('express');
const { createExam, teacherAllExams, deleteExam, allExams } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(teacherAllExams)
examRouter.route("/allExams").get(allExams)
examRouter.route("/:id").delete(deleteExam)

module.exports = examRouter;