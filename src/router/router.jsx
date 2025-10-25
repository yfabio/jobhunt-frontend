import { createBrowserRouter } from "react-router";

import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import UserPage from "../pages/UserPage";
import JobInfo from "../employee/JobInfo";
import ProtectedRoute from "../protect/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: ":id",
            element: <JobInfo />,
          },
        ],
      },
      { path: "/signin", element: <SigninPage /> },
      { path: "/signup", element: <SignupPage /> },
      {
        path: "/user",
        element: <ProtectedRoute element={<UserPage />} />,
      },
    ],
  },
]);

export default router;
