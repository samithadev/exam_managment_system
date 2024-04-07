const express = require('express');
const { createUserAnswer } = require('../application/features/studentans');

const studentansRouter = express.Router();

studentansRouter.route('/').post(createUserAnswer)

module.exports = studentansRouter;