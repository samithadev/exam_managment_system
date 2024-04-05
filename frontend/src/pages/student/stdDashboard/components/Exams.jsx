import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "./LogOut";
import { useNavigate } from "react-router-dom";

function Exams() {
  const [exams, setExams] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExams, setFilteredExams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/exam/allExams");
        setExams(response.data);
        setFilteredExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleSearch = () => {
    setFilteredExams(
      exams.filter((exam) =>
        exam.exam_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const handleExamClick = (examId) => {
    navigate(`/student/exam/${examId}`);
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
            {filteredExams.map((exam) => (
              <tr
                key={exam.exam_id}
                onClick={() => handleExamClick(exam.exam_id)}
                className=" cursor-pointer hover:bg-slate-200"
              >
                <td className=" border-solid border-2 p-3">{exam.exam_name}</td>
                <td className=" border-solid border-2 p-3">
                  {exam.createDate}
                </td>
                <td className=" border-solid border-2 p-3">{exam.duration}</td>
                <td className=" border-solid border-2 p-3">{exam.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Exams;