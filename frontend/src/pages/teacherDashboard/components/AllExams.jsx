import React, { useState, useEffect } from "react";
import axios from "axios";

function AllExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/exam", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error.response.data);
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      <h2>Exams Created by You:</h2>
      <ul>
        {exams.map((exam) => (
          <li key={exam.exam_id}>
            {exam.exam_name}
            <br />
            {exam.createDate}
            <br />
            {exam.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllExams;
