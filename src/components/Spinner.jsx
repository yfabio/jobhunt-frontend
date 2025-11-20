import { createPortal } from "react-dom";
const Spinner = () => {
  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>,
    document.getElementById("spinner")
  );
};

export default Spinner;
