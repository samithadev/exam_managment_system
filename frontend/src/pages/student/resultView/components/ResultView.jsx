import React from "react";
import { Link } from "react-router-dom";

function ResultView() {
  return (
    <div className=" flex flex-col items-center pt-20 h-screen w-screen gap-5">
      <div className=" border-solid border-2 w-1/2 h-1/3 p-8">
        <h1 className=" text-3xl">Exam completed</h1>

        <h1 className=" text-8xl text-green-500 text-center py-8">Passed</h1>
        <h2 className=" text-2xl text-center">A - 89 points</h2>
      </div>

      <div className=" border-solid border-2 w-1/2  p-8">
        <h1 className=" text-3xl">Questions</h1>
        <div className=" flex flex-col gap-4 mt-6">
          <div className=" flex justify-between border-2 border-solid py-7 px-8 text-xl">
            <h1 className="">Question 1</h1>
            <h1 className=" font-bold text-red-600">Wrong</h1>
          </div>
          <div className=" flex justify-between border-2 border-solid py-7 px-8 text-xl">
            <h1>Question 2</h1>
            <h1 className=" font-bold text-green-600">Correct</h1>
          </div>
        </div>
      </div>

      <div className=" pt-8">
        <Link
          to={"/student/dashboard"}
          className=" px-8 py-4 rounded-lg text-xl bg-red-600 text-white font-bold"
        >
          Close
        </Link>
      </div>
    </div>
  );
}

export default ResultView;
