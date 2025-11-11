import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    if (data) {
      return JSON.parse(data);
    } else {
      return {
        token: "",
        email: "",
        role: "",
        isLogin: false,
      };
    }
  });

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      tryAuthenticate(res, () => toast.success("Logged in successfully!"));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      tryAuthenticate(res, () => toast.success("Registered successfully!"));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`/api/api/v1/auth/logout`);
      if (res.ok) {
        localStorage.removeItem("user");
        setUser({
          token: "",
          email: "",
          role: "",
          isLogin: false,
        });
        navigate("/", { replace: true });
        toast.info("Logged out successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const tryAuthenticate = async (res, cb) => {
    try {
      if (res.ok) {
        const {
          token,
          user: { email, role },
        } = await res.json();
        const userData = { token, email, role, isLogin: !!token };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
        cb();
        navigate("/", { replace: true });
      } else {
        const { message } = await res.json();
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        register,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthCtx() {
  return useContext(AuthContext);
}
