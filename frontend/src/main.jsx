import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/root.layout";
import RegisterPage from "./pages/register/register.page";
import LoginPage from "./pages/login/login.page";
import StudentDash from "./pages/student/stdDashboard/studentDash.page";
import TeacherDash from "./pages/teacher/teacherDashboard/teacherDash.page";
import StudentLayout from "./layouts/student.layout";
import TeacherLayout from "./layouts/teacher.layout";
import CreateExam from "./pages/teacher/createExam/createExam.page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          {
            path: "dashboard",
            element: <StudentDash />,
          },
        ],
      },
      {
        path: "teacher",
        element: <TeacherLayout />,
        children: [
          {
            path: "dashboard",
            element: <TeacherDash />,
          },
          {
            path: "create_exam",
            element: <CreateExam />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
