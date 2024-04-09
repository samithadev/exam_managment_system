const express = require('express');
const { createExam, teacherAllExams, deleteExam, allExams, getEnrollStatus } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(teacherAllExams)
examRouter.route("/allExams").get(allExams)
examRouter.route("/:id").delete(deleteExam)
examRouter.route("/:examId/enrollment/:userId").get(getEnrollStatus)

module.exports = examRouter;