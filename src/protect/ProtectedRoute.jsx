import { Navigate, Outlet } from "react-router";
import { useAuthCtx } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuthCtx();

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return element;
};

export default ProtectedRoute;
