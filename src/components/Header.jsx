import { useRef, useState } from "react";
import { NavLink } from "react-router";
import { FaUser, FaBookmark } from "react-icons/fa6";

import SidePanel from "./SidePanel";
import { useAuthCtx } from "../context/AuthContext";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sidePanelRef = useRef();

  const { isLogin, logout } = useAuthCtx();

  const toggleDrawerHandler = () => {
    setIsDrawerOpen((prev) => !prev);
    sidePanelRef.current.classList.toggle("-translate-x-full", isDrawerOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="container mx-auto text-center">
      <div className="flex items-center justify-between">
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
              x="12"
              y="76"
              fontFamily="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
              fontWeight="700"
              fontSize="32"
              fill="url(#grad)">
              JobHunt
            </text>
          </svg>
        </NavLink>
        <nav className="hidden md:block">
          <ul className="flex items-center text-xl justify-between gap-4">
            {!isLogin && (
              <li className="font-semibold text-sky-600 hover:underline">
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            )}
            {isLogin && (
              <li className="group font-semibold text-sky-600 hover:underline">
                <button
                  onClick={handleLogout}
                  className="group-hover:underline cursor-pointer">
                  Logout
                </button>
              </li>
            )}
            {isLogin && (
              <>
                <li>
                  <NavLink to={"/user"}>
                    <FaUser />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <button
          className="block md:hidden"
          onClick={toggleDrawerHandler}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <rect
                x="3"
                y="6"
                width="18"
                height="2"
                rx="1"
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="2"
                rx="1"
              />
              <rect
                x="3"
                y="16"
                width="18"
                height="2"
                rx="1"
              />
            </svg>
          </span>
        </button>
        <SidePanel sidePanelRef={sidePanelRef} />
      </div>
    </header>
  );
};

export default Header;
