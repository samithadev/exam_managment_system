const express = require('express');
const { createExam, teacherAllExams, deleteExam, allExams, getEnrollStatus, getExam, getExamsStatus, updateExam } = require('../application/features/exam');

const examRouter = express.Router();

examRouter.route("/").post(createExam).get(teacherAllExams)
examRouter.route("/allExams").get(allExams)
examRouter.route("/:id").delete(deleteExam).get(getExam).post(updateExam)
examRouter.route("/:examId/enrollment/:userId").get(getEnrollStatus)
examRouter.route("/user/:userId").get(getExamsStatus)

module.exports = examRouter;