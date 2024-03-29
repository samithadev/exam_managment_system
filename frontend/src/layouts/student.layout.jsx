import React from "react";
import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}

export default StudentLayout;
