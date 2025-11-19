import { createBrowserRouter, Navigate } from "react-router";

import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import JobInfo from "../member/JobInfo";
import NotFound from "../components/NotFound";
import ProtectedRoute from "../protect/ProtectedRoute";

import MemberAccountSettings from "../member/AccountSettings";
import BussinesAccountSettings from "../business/AccountSettings";

import MemberPage from "../pages/MemberPage";
import MemberProfile from "../member/Profile";
import MemberJobs from "../member/Jobs";

import BusinessPage from "../pages/BusinessPage";
import BusinessProfile from "../business/Profile";
import BusinessPostJob from "../business/PostJob";
import BusinessJobs from "../business/Jobs";
import BusinessMembers from "../business/Members";

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
          },
        ],
      },
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        path: "member",
        element: <ProtectedRoute element={<MemberPage />} />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="profile"
                replace
              />
            ),
          },
          { path: "profile", element: <MemberProfile /> },
          { path: "jobs", element: <MemberJobs /> },
          { path: "accountsettings", element: <MemberAccountSettings /> },
        ],
      },
      {
        path: "business",
        element: <ProtectedRoute element={<BusinessPage />} />,
        children: [
          {
            index: true,
            element: (
              <Navigate
                to="profile"
                replace
              />
            ),
          },
          { path: "profile", element: <BusinessProfile /> },
          {
            path: "postjob",
            element: <BusinessPostJob />,
            children: [{ path: ":id", element: <BusinessPostJob /> }],
          },
          { path: "jobs", element: <BusinessJobs /> },
          { path: "candidates", element: <BusinessMembers /> },
          { path: "accountsettings", element: <BussinesAccountSettings /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
