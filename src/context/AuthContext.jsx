import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    role: "",
    isLogin: false,
  });

  const navigate = useNavigate();

  const login = (role) => {
    setUser({ role, isLogin: true });
  };

  const logout = () => {
    setUser((prev) => ({ role: "", isLogin: false }));
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthCtx() {
  return useContext(AuthContext);
}
