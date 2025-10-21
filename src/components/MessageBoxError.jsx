import { FaXmark } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import { useEffect, useState } from "react";

const MessageBoxError = ({ message }) => {
  const [show, setShow] = useState(message);

  useEffect(() => {
    const time = setTimeout(() => setShow(null), 3000);
    return () => {
      clearTimeout(time);
    };
  }, [message]);

  return (
    <>
      {show && (
        <div className="flex flex-col mb-0.5">
          <div className="flex items-center justify-between gap-2 py-2 px-4 rounded w-full border-0 bg-red-100 outline-none">
            <div className="flex items-center gap-2">
              <FaBan
                size={22}
                className="text-red-500"
              />
              <p className="text-lg">{message}</p>
            </div>
            <button
              onClick={() => setShow(null)}
              type="button"
              className="rounded cursor-pointer focus:outline-2 focus:outline-sky-500 p-1">
              <FaXmark />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageBoxError;
