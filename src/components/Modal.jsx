import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

const Modal = ({ children, close }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={close}
        className="absolute inset-0 bg-[rgba(0,0,0,0.30)]"></div>

      <div className="max-h-3/4 relative bg-white rounded overflow-hidden overflow-y-scroll shadow-lg p-6 z-10">
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
        <div className="flex items-center justify-center mt-4 w-full">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
