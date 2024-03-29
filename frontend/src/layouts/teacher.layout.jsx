import React from "react";
import { Outlet } from "react-router-dom";

function TeacherLayout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default TeacherLayout;
