import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile if token exists
  const fetchUser = async () => {
    try {
      const { data } = await API.get("/auth/profile");
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      API.defaults.headers.Authorization = `Bearer ${data.token}`;

      setUser(data.user);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register user
  const register = async (name, email, password) => {
    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      API.defaults.headers.Authorization = `Bearer ${data.token}`;

      setUser(data.user);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
