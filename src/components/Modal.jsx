import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, title, close }) => {
  return createPortal(
    <div className="fixed inset-0 flex flex-col items-center md:flex-row  md:justify-center z-50">
      <div
        onClick={close}
        className="absolute inset-0 bg-[rgba(0,0,0,0.30)]"></div>

      <div className="max-h-[calc(100%-4rem)] mt-20 relative bg-white rounded overflow-y-auto scrollbar-hidden my-20 shadow-lg p-6 z-10">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex justify-end border-b pb-3">
          <button
            onClick={close}
            className="rounded p-1 hover:bg-gray-300">
            <FaTimes
              size={22}
              className="text-black"
            />
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
