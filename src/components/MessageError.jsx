import { FaBan } from "react-icons/fa";

const MessageError = ({ children }) => {
  return (
    <div className="flex items-center gap-2">
      <FaBan
        size={22}
        className="text-red-500"
      />
      <p className="text-sm text-red-500">{children}</p>
    </div>
  );
};

export default MessageError;
