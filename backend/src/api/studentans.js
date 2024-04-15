const express = require('express');
const { createUserAnswer, updateUserAnswer, getExistingAnswer, getAllUserAns } = require('../application/features/studentans');

const studentansRouter = express.Router();

studentansRouter.route('/').post(createUserAnswer)
studentansRouter.route('/:userId/:examId/:questionId').get(getExistingAnswer)
studentansRouter.route('/:stdAnsId').put(updateUserAnswer)
studentansRouter.route('/:userId/:examId').get(getAllUserAns)

module.exports = studentansRouter;