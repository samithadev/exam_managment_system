import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExamOverview() {
  const [enrollments, setEnrollments] = useState([]);
  const { id: examId } = useParams();

  useEffect(() => {
    const examEnrollments = async () => {
      try {
        const enrollments = await axios.get(
          `http://localhost:8000/examenroll/${examId}`
        );
        const fetchedEnrollments = enrollments.data;
        setEnrollments(fetchedEnrollments);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    examEnrollments();
  }, [examId]);

  // Calculate average point
  const totalPoints = enrollments.reduce((acc, curr) => acc + curr.points, 0);
  const averagePoint = totalPoints / enrollments.length;

  // Filter users with points higher than average
  const usersAboveAverage = enrollments.filter(
    (enrollment) => enrollment.points >= averagePoint
  );

  const usersBelowAverage = enrollments.filter(
    (enrollment) => enrollment.points < averagePoint
  );

  console.log(enrollments);

  // Calculate grade counts
  const gradeCounts = enrollments.reduce((acc, curr) => {
    const grade = curr.grade.toUpperCase(); // Assuming grade is a string like 'A', 'B', 'C', 'F'
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {});

  // Calculate total students
  const totalStudents = enrollments.length;

  // Calculate percentages
  const gradePercentages = Object.values(gradeCounts).map(
    (count) => (count / totalStudents) * 100
  );

  const data1 = {
    datasets: [
      {
        data: gradePercentages,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
    labels: ["A", "B", "C", "F"], // Labels for the grades
  };

  const data2 = {
    datasets: [
      {
        data: [33, 53, 85, 41, 44, 65],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className=" p-16">
      <Link
        to={`/teacher/monitorexam/${examId}`}
        className=" p-3 text-white bg-slate-500 rounded-xl w-auto"
      >
        Back
      </Link>
      <div className=" flex gap-5 my-5">
        <div className="flex flex-col items-center border-solid border-2 w-1/2 p-8">
          <h1 className=" text-xl">
            Attending and Results progress though Time
          </h1>
          {/* <div className="w-[400px]">
            <Line data={data2} />
          </div> */}
        </div>
        <div className=" flex flex-col items-center border-solid border-2 w-1/2 p-8">
          <h1 className=" text-xl">Average Result Grade Percentages</h1>
          <div className="w-[300px]">
            <Doughnut data={data1} key="doughnut-chart" />
          </div>
        </div>
      </div>
      <div className=" flex gap-5 my-5">
        <div className=" border-solid border-2 w-1/2 p-8">
          <h1 className=" text-xl">Average Top Results Students</h1>

          <table className=" border-solid border-2 w-full mt-5">
            <thead className=" bg-blue-100">
              <tr>
                <th className=" border-solid border-2 p-3">Student</th>
                <th className=" border-solid border-2">Average</th>
              </tr>
            </thead>
            <tbody>
              {usersAboveAverage.map((user) => (
                <tr key={user.userId} className=" cursor-pointer ">
                  <td className=" border-solid border-2 p-3">{user.userId}</td>
                  <td className=" border-solid border-2 p-3">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" border-solid border-2 w-1/2 p-8">
          <h1 className=" text-xl">Average Low Results Students</h1>

          <table className=" border-solid border-2 w-full mt-5">
            <thead className=" bg-blue-100">
              <tr>
                <th className=" border-solid border-2 p-3">Student</th>
                <th className=" border-solid border-2">Average</th>
              </tr>
            </thead>
            <tbody>
              {usersBelowAverage.map((user) => (
                <tr key={user.userId} className=" cursor-pointer ">
                  <td className=" border-solid border-2 p-3">{user.userId}</td>
                  <td className=" border-solid border-2 p-3">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExamOverview;
