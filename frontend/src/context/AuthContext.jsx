/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
      if (window.location.pathname !== "/auth") {
        navigate("/auth");
      }
    }
  }, [navigate]);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/auth");
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem("token");
      setUser(null);
      handleSuccess("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    toast.error(error.response?.data?.error || "Something went wrong");
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        handleError,
        handleSuccess,
        loading,
      }}
    >
      <Toaster position="top-center" />
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
