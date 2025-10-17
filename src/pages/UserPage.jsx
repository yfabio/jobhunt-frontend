import { useState } from "react";

import { FaPen, FaSignOutAlt } from "react-icons/fa";

import Profile from "../employee/Profile";
import Jobs from "../employee/Jobs";
import Interviews from "../employee/Interviews";
import { useAuthCtx } from "../context/AuthContext";

const UserPage = () => {
  const [menu, setMenu] = useState([
    {
      label: "Profile",
      selected: true,
    },
    {
      label: "Jobs",
      selected: false,
    },
    {
      label: "Interviews",
      selected: false,
    },
  ]);

  const { logout } = useAuthCtx();

  const onMenuSelected = (label) => {
    setMenu((prev) =>
      prev.map((obj) => {
        if (obj.label === label) {
          obj.selected = true;
        } else {
          obj.selected = false;
        }
        return obj;
      })
    );
  };

  const selected = menu.find((item) => item.selected);

  const renderComponent = () => {
    switch (selected.label) {
      case "Profile":
        return <Profile />;
      case "Jobs":
        return <Jobs />;
      case "Interviews":
        return <Interviews />;
      default:
        return <div>Please select a menu item</div>;
    }
  };

  return (
    <section className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="md:h-screen w-80 p-2">
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col items-center justify-center w-22 h-22 rounded-full relative shadow bg-white">
                <span className="text-4xl font-bold ">{"FY"}</span>
                <button className="flex items-center justify-center w-6 h-6 border rounded-full cursor-pointer absolute -bottom-1 right-1">
                  <FaPen size={10} />
                </button>
              </div>
              <h2 className="font-semibold text-2xl">Fabio Yamashita</h2>
              <p className="font-light text-gray-500">
                Software Developer at Tata Consultancy Services Limited
              </p>
            </div>
            <div className="my-4 border-b-[1px] border-b-slate-600"></div>
            <ul className="flex flex-col gap-3">
              {menu.map((obj) => (
                <li
                  key={obj.label}
                  onClick={() => onMenuSelected(obj.label)}
                  className={`w-full font-semibold py-2 pl-1 text-slate-600 cursor-pointer 
                 border border-transparent border-l-4 transition-colors hover:text-slate-700  hover:border-l-slate-600
                  ${obj.selected ? "border-l-slate-600" : ""}`}>
                  {obj.label}
                </li>
              ))}
            </ul>
            <div className="my-4 border-b-[1px] border-b-slate-600"></div>
            <button
              onClick={logout}
              className="group flex items-center justify-between w-full cursor-pointer">
              <span className="font-semibold text-slate-600 underline-offset-2 group-hover:underline ">
                Sign Out
              </span>
              <FaSignOutAlt size={20} />
            </button>
          </div>
        </aside>
        <div className="rounded w-full">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default UserPage;
