import { createBrowserRouter } from "react-router";

import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import MemberPage from "../pages/MemberPage";
import JobInfo from "../member/JobInfo";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../protect/ProtectedRoute";
import BusinessPage from "../pages/BusinessPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
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
        path: "/member",
        element: <ProtectedRoute element={<MemberPage />} />,
      },
      {
        path: "/business",
        element: <ProtectedRoute element={<BusinessPage />} />,
      },
    ],
  },
]);

export default router;
