const sql_connection = require("../../db/db");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUserAnswer = async (req, res) => {
    try {
        const studentAnswers = req.body;

  const query = 'INSERT INTO studentanswers (userId, examId, questionId, answerId, ansStatus) VALUES ?';
  const values = studentAnswers.map(answer => [answer.userId, answer.examId, answer.questionId, answer.answerId, answer.ansStatus]);

  sql_connection.query(query, [values], (error) => {
    if (error) {
      console.error('Error inserting student answers:', error);
      res.status(500).json({ error: 'Failed to insert student answers' });
      return;
    }

    res.json({ message: 'Student answers inserted successfully' });
  });
    } catch (error) {
        console.error('Error saving user answer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createUserAnswer };