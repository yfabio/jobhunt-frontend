import { createBrowserRouter } from "react-router";

import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import JobInfo from "../member/JobInfo";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../protect/ProtectedRoute";

import AccountSettings from "../components/AccountSettings";

import MemberPage from "../pages/MemberPage";
import MemberProfile from "../member/Profile";
import MemberJobs from "../member/Jobs";

import BusinessPage from "../pages/BusinessPage";
import BusinessProfile from "../business/Profile";
import BusinessPostJob from "../business/PostJob";
import BusinessJobs from "../business/Jobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: ":id",
            element: <JobInfo />,
            errorElement: <NotFound />,
          },
        ],
      },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "member",
        element: <ProtectedRoute element={<MemberPage />} />,
        children: [
          { path: "profile", element: <MemberProfile /> },
          { path: "jobs", element: <MemberJobs /> },
          { path: "accountsettings", element: <AccountSettings /> },
        ],
      },
      {
        path: "business",
        element: <ProtectedRoute element={<BusinessPage />} />,
        children: [
          { path: "profile", element: <BusinessProfile /> },
          { path: "postjob", element: <BusinessPostJob /> },
          { path: "jobs", element: <BusinessJobs /> },
          { path: "accountsettings", element: <AccountSettings /> },
        ],
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
