import React from "react";
import { useParams } from "react-router-dom";

function ExamView() {
  const { id } = useParams();
  console.log("Exam ID:", id);
  return (
    <div>
      <h1>Exam View</h1>
      <p>Exam ID: {id}</p>
    </div>
  );
}

export default ExamView;
