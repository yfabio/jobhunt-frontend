import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ id, title, value, onChange, onBlur }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={id}
        className="font-light text-sm">
        {title}
      </label>
      <div className="relative w-full">
        <input
          type={showPass ? "text" : "password"}
          name={id}
          id={id}
          placeholder="Current Password"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`block py-2 border rounded w-full pl-4`}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setShowPass((prev) => !prev)}>
          {showPass ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
