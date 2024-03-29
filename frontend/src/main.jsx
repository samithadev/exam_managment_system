import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/root.layout";
import RegisterPage from "./pages/register/register.page";
import LoginPage from "./pages/login/login.page";
import StudentDash from "./pages/stdDashboard/studentDash.page";
import TeacherDash from "./pages/teacherDashboard/teacherDash.page";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/student_dashboard",
        element: <StudentDash />,
      },
      {
        path: "/teacher_dashboard",
        element: <TeacherDash />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);