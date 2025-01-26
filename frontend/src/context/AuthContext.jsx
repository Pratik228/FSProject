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
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      handleError(error);
      navigate("/auth"); // Add this
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      handleSuccess("Logged out successfully");
      navigate("/auth"); // Add this
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
