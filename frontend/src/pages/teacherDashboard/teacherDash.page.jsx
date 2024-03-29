import React from "react";
import AllExams from "./components/AllExams";
import LogoutButton from "./components/LogOut";

function TeacherDash() {
  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <AllExams />
      <LogoutButton />
    </div>
  );
}

export default TeacherDash;
