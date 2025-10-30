import { useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

const Dropdown = ({ selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ["Delete"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    selected(option);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-300">
        <FaEllipsis />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10
        hover:bg-red-100 hover:border-sky-500">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option.toLowerCase())}
                className="px-4 py-2 text-sm text-red-600 cursor-pointer">
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
