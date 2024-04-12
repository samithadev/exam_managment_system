const express = require('express');
const { createExam, teacherAllExams, deleteExam, allExams, getEnrollStatus, getExam, getExamsStatus } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(teacherAllExams)
examRouter.route("/allExams").get(allExams)
examRouter.route("/:id").delete(deleteExam).get(getExam)
examRouter.route("/:examId/enrollment/:userId").get(getEnrollStatus)
examRouter.route("/user/:userId").get(getExamsStatus)

module.exports = examRouter;