import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExamOverview() {
  const { id: examId } = useParams();

  const data1 = {
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
              <tr className=" cursor-pointer ">
                <td className=" border-solid border-2 p-3">1</td>
                <td className=" border-solid border-2 p-3">2</td>
              </tr>
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
              <tr className=" cursor-pointer ">
                <td className=" border-solid border-2 p-3">1</td>
                <td className=" border-solid border-2 p-3">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExamOverview;
