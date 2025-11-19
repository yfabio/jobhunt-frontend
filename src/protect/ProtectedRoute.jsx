import { Navigate, Outlet } from "react-router";
import { useAuthCtx } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthCtx();

  if (!user.token) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
