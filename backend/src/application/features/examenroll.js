require("dotenv").config();
const sql_connection = require("../../db/db");

const newEnroll = async (req, res) => {
    const { userId, examId } = req.params;
    const { status } = req.body;
  
    try {
      // Check if the enrollment already exists
      const existingEnrollment = await sql_connection.query(
        'SELECT * FROM exam_enrollment WHERE userId = ? ',
        [userId]
      );

      if (!existingEnrollment) {
        // If the enrollment does not exist, create a new one
        await sql_connection.query(
          'INSERT INTO exam_enrollment (userId, examId, enrollStatus) VALUES (?, ?, ?)',
          [userId, examId, status]
        );
        res.status(201).json({ message: 'New enrollment created successfully' });
      } else {
        res.status(200).json({ message: 'Enrollment already exists' });
      }
    } catch (error) {
      console.error('Error creating new enrollment:', error);
      res.status(500).json({ message: 'Failed to create new enrollment' });
    }
}

module.exports = newEnroll;
