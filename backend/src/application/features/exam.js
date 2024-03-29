const jwt = require('jsonwebtoken');
require('dotenv').config();
const sql_connection = require("../../db/db");

const createExam = async (req, res) => {
    try {
        const { exam_name, duration, status, allocatedMarks } = req.body;

        // Get user's email from JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user_email = decodedToken.email;

        // Get user's role from email
        const user = await new Promise((resolve, reject) => {
            sql_connection.query('SELECT * FROM user WHERE email = ?', [user_email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });

        if (!user || user.role !== 1) { // Assuming role_id 1 is for teachers
            return res.status(403).json({ message: 'Unauthorized. Only teachers can create exams' });
        }

        // Get current date and time
        const createDate = new Date();

        // Insert the new exam into the database
        const newExam = { exam_name, duration, status, allocatedMarks, createDate, createdUser: user.user_id };
        await new Promise((resolve, reject) => {
            sql_connection.query('INSERT INTO exam SET ?', newExam, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const allExams = async (req, res) => {
    try {
        // Get user's email from JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user_email = decodedToken.email;

        // Get user's role from email
        const user = await new Promise((resolve, reject) => {
            sql_connection.query('SELECT * FROM user WHERE email = ?', [user_email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Fetch all exams from the database
        const exams = await new Promise((resolve, reject) => {
            sql_connection.query('SELECT * FROM exam WHERE createdUser = ?', [user.user_id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {createExam, allExams}