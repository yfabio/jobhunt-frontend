import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const login = () => {
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
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
