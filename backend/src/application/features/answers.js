const sql_connection = require("../../db/db");

const getAnswers = async (req, res) => {
    try {
        const { id: questionId } = req.params;

        const answers = await new Promise((resolve, reject) => {
            sql_connection.query(
                "SELECT * FROM answers WHERE questionId = ?",
                [questionId],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          });

          if (!answers) {
            return res.status(404).json({ message: "answers not found" });
        }

        res.status(200).json({ data: answers });
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAnswers };