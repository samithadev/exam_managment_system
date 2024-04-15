import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function MonitorExam() {
  const [exam, setExam] = useState([]);
  const { id: examId } = useParams();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [attendedCount, setAttendedCount] = useState(0);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/exam/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExam(response.data[0]);

        // Fetch enrolled students
        const enrolledResponse = await axios.get(
          `http://localhost:8000/examenroll/${examId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Count the number of students who have attended
        const attended = enrolledResponse.data.filter(
          (student) => student.enrollStatus === "attended"
        );

        setEnrolledStudents(enrolledResponse.data);
        setAttendedCount(attended.length);
      } catch (error) {
        console.error("Error fetching exam details:", error.response.data);
      }
    };

    fetchExamDetails();
  }, [examId]);

  if (!exam) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className=" flex items-center gap-5 p-10">
        <Link
          to={"/teacher/dashboard"}
          className="p-3 bg-slate-500 rounded-xl text-white"
        >
          Back
        </Link>
        <h1 className=" text-2xl">{exam.exam_name}</h1>
      </div>
      <div className="flex justify-center p-10 gap-5">
        <div className="">
          <div className=" border-solid border-2 p-3">
            <h1 className=" text-2xl">Exam Completed</h1>
            <div className=" p-10">
              <text className=" text-8xl">
                {attendedCount}/{enrolledStudents.length}
              </text>
              <h1 className=" text-xl mt-5">Time Left:</h1>
            </div>
          </div>

          <div className=" border-solid border-2 p-3 mt-5">
            <h1 className=" text-xl mt-3">Exam started time: </h1>
            <h1 className=" text-xl mt-3">Exam ending time: </h1>
            <p className=" text-xl mt-3">Exam Date: {exam.examDate}</p>
          </div>
        </div>

        <div className=" border-solid border-2 w-1/2 p-3">
          <h1 className=" text-2xl">Attending Student List</h1>
          <ul>
            {enrolledStudents.map((student, index) => (
              <li
                key={index}
                className=" border-solid border-2 p-4 text-lg my-4"
              >
                <div className=" flex justify-between">
                  <h1>{student.userId}</h1>
                  <h1 className=" font-bold text-green-500">
                    {student.enrollStatus}
                  </h1>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className=" flex items-end justify-end">
        <button className=" p-3 text-white bg-red-500 rounded-xl w-auto">
          End Exam
        </button>
      </div>
    </div>
  );
}

export default MonitorExam;
