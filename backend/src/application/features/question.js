const sql_connection = require("../../db/db");

const getQuestion = async (req, res) => {
    try {
        const { id: examId } = req.params;

        const questions = await new Promise((resolve, reject) => {
            sql_connection.query(
                "SELECT * FROM questions WHERE examId = ?",
                [examId],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          if (!questions) {
            return res.status(404).json({ message: "questions not found" });
        }

        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching exam:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getQuestion };