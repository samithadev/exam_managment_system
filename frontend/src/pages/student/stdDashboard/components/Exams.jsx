import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogOut";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Exams() {
  const [examStatus, setExamstatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExamStatus, setFilteredExamstatus] = useState([]);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }

    const fetchExamsAndStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/exam/user/${userId}`
        );
        setExamstatus(response.data);
        setFilteredExamstatus(response.data);
      } catch (error) {
        console.log("no fetching exams and enrollment statuses:");
      }
    };

    fetchExamsAndStatus();
  }, [userId]);

  const handleSearch = () => {
    filteredExamStatus(
      examStatus.filter((exam) =>
        exam.exam_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleExamClick = async (examId) => {
    try {
      // Check if the user is already enrolled in the exam
      const response = await axios.get(
        `http://localhost:8000/examenroll/${userId}/${examId}`
      );

      console.log(response.data.enrollStatus);
      const status = response.data.enrollStatus;

      if (status.length == 0) {
        const confirmEnroll = window.confirm(
          "Are you sure you want to enroll in this exam?"
        );
        if (confirmEnroll) {
          enrollUser(examId);
        }
      }
      if (status[0].enrollStatus == "pending") {
        navigate(`/student/exam/${examId}`);
      }

      if (status[0].enrollStatus == "attended") {
        navigate(`/student/resultview/${examId}`);
      }
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    }
  };

  const enrollUser = async (examId) => {
    try {
      await axios.post(`http://localhost:8000/examenroll/${userId}/${examId}`, {
        status: "pending",
      });

      navigate(`/student/exam/${examId}`);
    } catch (error) {
      console.error("Error enrolling in exam:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center pt-48">
      <div className=" w-3/4">
        <div className=" flex w-full justify-between mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Exam Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-solid border-2 p-2 "
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-600 text-white rounded-lg"
            >
              Search
            </button>
          </div>

          <div className=" flex gap-6">
            <LogoutButton />
          </div>
        </div>

        <table className=" border-solid border-2 w-full">
          <thead className=" bg-blue-100">
            <tr>
              <th className=" border-solid border-2 p-5">Exam Name</th>
              <th className=" border-solid border-2">Start Date</th>
              <th className=" border-solid border-2">Duration</th>
              <th className=" border-solid border-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredExamStatus.map((exam) => (
              <tr
                key={exam.exam_id}
                onClick={() => handleExamClick(exam.exam_id)}
                className=" cursor-pointer hover:bg-slate-200"
              >
                <td className=" border-solid border-2 p-3">{exam.exam_name}</td>
                <td className=" border-solid border-2 p-3">{exam.examDate}</td>
                <td className=" border-solid border-2 p-3">{exam.duration}</td>
                <td className=" border-solid border-2 p-3">
                  {exam.enrollStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exams;
