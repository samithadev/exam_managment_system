const jwt = require("jsonwebtoken");
require("dotenv").config();
const sql_connection = require("../../db/db");

const createExam = async (req, res) => {
    try {
      const { exam_name, duration, examDate, status, questions } = req.body;
  
      // Get user's email from JWT token
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user_email = decodedToken.email;
  
      // Get user's role from email
      const user = await new Promise((resolve, reject) => {
        sql_connection.query(
          "SELECT * FROM user WHERE email = ?",
          [user_email],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0]);
            }
          }
        );
      });
  
      if (!user || user.role !== 1) {
        // Assuming role_id 1 is for teachers
        return res
          .status(403)
          .json({ message: "Unauthorized. Only teachers can create exams" });
      }
  
      // Insert the new exam into the database
      const newExam = {
        exam_name,
        duration,
        examDate,
        status,
        createdUser: user.user_id,
      };
      const insertExam = await new Promise((resolve, reject) => {
        sql_connection.query(
          "INSERT INTO exam SET ?",
          newExam,
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results);
            }
          }
        );
      });
  
      const examId = insertExam.insertId;
  
      // Insert questions and answers into the database
      for (const question of questions) {
        const { questionText, answers } = question;
  
        const insertQuestion = await new Promise((resolve, reject) => {
          sql_connection.query(
            "INSERT INTO questions (examId, question) VALUES (?, ?)",
            [examId, questionText],
            (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            }
          );
        });
  
        const questionId = insertQuestion.insertId;
  
        for (const answer of answers) {
          const insertAnswer = await new Promise((resolve, reject) => {
            sql_connection.query(
              "INSERT INTO answers (questionId, answer, status) VALUES (?, ?, ?)",
              [questionId, answer.text, answer.isCorrect ? 1 : 0],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });
        }
      }
      res.status(201).json({ message: "Exam created successfully" });
    } catch (error) {
      console.error("Error creating exam:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const teacherAllExams = async (req, res) => {
  try {
    // Get user's email from JWT token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user_email = decodedToken.email;

    // Get user's role from email
    const user = await new Promise((resolve, reject) => {
      sql_connection.query(
        "SELECT * FROM user WHERE email = ?",
        [user_email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Fetch all exams from the database
    const exams = await new Promise((resolve, reject) => {
      sql_connection.query(
        "SELECT * FROM exam WHERE createdUser = ?",
        [user.user_id],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get all exams
const allExams = async (req,res) => {
  try{
    // Fetch all exams from the database
    const allExams = await new Promise((resolve, reject) => {
      sql_connection.query(
        "SELECT * FROM exam",
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
    res.status(200).json(allExams);

  } catch{
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteExam = async (req, res) => {
    try {
      const { examId } = req.params;
  
      // Check if the exam exists
      const examExists = await new Promise((resolve, reject) => {
        sql_connection.query(
          "SELECT * FROM exam WHERE exam_id = ?",
          [examId],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results.length > 0);
            }
          }
        );
      });
  
      if (!examExists) {
        return res.status(404).json({ message: "Exam not found" });
      }
  
      // Delete the exam from the database
      await new Promise((resolve, reject) => {
        sql_connection.query(
          "DELETE FROM exam WHERE exam_id = ?",
          [examId],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve();
            }
          }
        );
      });
  
      res.status(200).json({ message: "Exam deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { createExam, teacherAllExams, deleteExam ,allExams};
