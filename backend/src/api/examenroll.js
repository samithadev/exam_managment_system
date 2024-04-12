const express = require('express');
const {newEnroll, checkEnroll, updateEnroll} = require('../application/features/examenroll');

const examenrollRouter = express.Router();

examenrollRouter.route("/:userId/:examId").post(newEnroll).get(checkEnroll).put(updateEnroll)

module.exports = examenrollRouter;