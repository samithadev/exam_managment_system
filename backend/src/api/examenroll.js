const express = require('express');
const newEnroll = require('../application/features/examenroll');

const examenrollRouter = express.Router();

examenrollRouter.route("/:userId/:examId").post(newEnroll)

module.exports = examenrollRouter;