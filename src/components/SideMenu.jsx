import { NavLink } from "react-router";
import { useAuthCtx } from "../context/AuthContext";

import { FaUser, FaUserTie } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SidePanel = ({ isDrawerOpen, toggleDrawerHandler }) => {
  const { user, logout } = useAuthCtx();

  const [businesProfile, setBusinessProfile] = useState({
    _id: null,
    name: "",
    industry: "",
    location: "",
  });

  const [memberProfile, setMemberProfile] = useState({
    _id: null,
    empStatus: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    location: "",
    employer: "",
    primaryIndustry: "",
    resumePath: "",
    resumeName: "",
  });

  const handleLogout = (e) => {
    toggleDrawerHandler();
    logout();
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (user.role === "member") {
          const res = await fetch(`/api/api/v1/members/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (res.ok) {
            const { data } = await res.json();
            setMemberProfile(data);
          } else {
            const { message } = await res.json();
            toast.error(message);
          }
        } else if (user.role === "business") {
          const res = await fetch("/api/api/v1/businesses/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
          if (res.ok) {
            const { data } = await res.json();
            setBusinessProfile(data);
          } else {
            const { message } = await res.json();
            toast.error(message);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user.token) {
      loadUserProfile();
    }
  }, [user.token]);

  return (
    <>
      <div className="bg-gray-100">
        {/* Drawer & Backdrop */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            isDrawerOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleDrawerHandler}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-50" : "opacity-0"
            }`}
          />

          {/* Drawer Panel */}
          <div
            className={`absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside drawer
          >
            <div className="flex items-center justify-center p-4 border-b">
              <NavLink to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 120"
                  width="200"
                  height="120"
                  role="img"
                  aria-label="JobHunt logo">
                  <defs>
                    <linearGradient
                      id="grad"
                      x1="0"
                      x2="1">
                      <stop
                        offset="0"
                        stopColor="#0ea5e9"
                      />
                      <stop
                        offset="1"
                        stopColor="#bae6fd"
                      />
                    </linearGradient>
                  </defs>
                  <text
                    x="50"
                    y="50"
                    fontFamily="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="28"
                    fill="url(#grad)">
                    JobHunt
                  </text>
                </svg>
              </NavLink>
            </div>

            <div className="flex flex-col mt-4">
              {user.role === "member" ? (
                <h2 className="font-medium text-lg">{`${memberProfile.firstName} ${memberProfile.lastName}`}</h2>
              ) : (
                <h2 className="font-medium text-lg">{businesProfile.name}</h2>
              )}
              {user.role === "member" ? (
                <p className="font-light">{memberProfile.jobTitle}</p>
              ) : (
                <p className="font-light">{businesProfile.industry}</p>
              )}
            </div>

            <nav className="p-4">
              <ul className="flex flex-col items-center justify-center space-y-6">
                {!user.isLogin && (
                  <li className="font-semibold text-sky-600 hover:underline">
                    <NavLink
                      to="/signin"
                      onClick={toggleDrawerHandler}>
                      Sign In
                    </NavLink>
                  </li>
                )}
                {user.isLogin && user.role === "member" && (
                  <li>
                    <NavLink
                      to={"/member"}
                      onClick={toggleDrawerHandler}>
                      <FaUser size={22} />
                    </NavLink>
                  </li>
                )}
                {user.isLogin && user.role === "business" && (
                  <li>
                    <NavLink
                      to={"/business"}
                      onClick={toggleDrawerHandler}>
                      <FaUserTie size={22} />
                    </NavLink>
                  </li>
                )}
                {user.isLogin && (
                  <li className="group font-semibold text-sky-600 hover:underline">
                    <button
                      onClick={handleLogout}
                      className="group-hover:underline cursor-pointer">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
