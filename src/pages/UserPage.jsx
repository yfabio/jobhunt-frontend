import { useState } from "react";
import Profile from "../components/Profile";
import Jobs from "../components/Jobs";
import Interviews from "../components/Interviews";

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
        <aside className="md:h-screen w-60 rounded p-4">
          <ul className="flex flex-col gap-2">
            {menu.map((obj) => (
              <li
                key={obj.label}
                onClick={() => onMenuSelected(obj.label)}
                className={`${
                  obj.selected ? "underline" : ""
                } font-semibold py-2 text-slate-600 underline-offset-4 cursor-pointer hover:underline`}>
                {obj.label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="rounded w-full">{renderComponent()}</div>
      </div>
    </section>
  );
};

export default UserPage;
