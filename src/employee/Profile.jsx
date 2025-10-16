import { useState } from "react";

const Profile = () => {
  const [tabs, setTabs] = useState([
    { id: "overview", label: "Overview", selected: true },
    { id: "experience", label: "Experience", selected: false },
    { id: "education", label: "Education", selected: false },
    { id: "skills", label: "Skills", selected: false },
  ]);

  const selectedTab = (tabId) => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id === tabId) {
          tab.selected = true;
        } else {
          tab.selected = false;
        }
        return tab;
      })
    );
  };

  const selected = tabs.find((tab) => tab.selected);

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              selectedTab(tab.id);
            }}
            className={`px-4 py-2 text-lg font-medium          
            ${
              tab.selected
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }
        `}>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
