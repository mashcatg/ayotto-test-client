/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxios();

  const initialState = {
    user: null,
    token: null,
    isLoggedIn: false,
  };

  const [auth, setAuth] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const loginUser = async (data) => {
    try {
      setLoading(true);

      const response = await axiosPublic.post("auth/login", data);

      // Check if response is successful
      if (response?.data?.success) {
        const authData = {
          user: response.data.data,
          token: response.data.token,
          isLoggedIn: true,
        };

        // Update auth state
        setAuth((prev) => ({
          ...prev,
          ...authData,
        }));

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(authData));

        // Show success message
        toast.success("Login Successful!");

        // Handle redirection based on role
        const userRole = response.data.data.role;
        let redirectPath ;

        switch (userRole) {
          case "admin":
            redirectPath = "/dashboard/admin-dashboard";
            break;
          case "user":
            redirectPath = "/dashboard/student-dashboard";
            break;
          default:
            redirectPath = "/dashboard";
        }

        window.location.href = redirectPath;
        return response;
      } else {
        // Handle unsuccessful login
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      // Handle different types of errors
      let errorMessage = "Failed to login";

      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data.message || "Invalid credentials";
      } else if (error.request) {
        // No response received
        errorMessage = "Network error. Please check your connection";
      } else {
        // Other errors
        errorMessage = error.message || "Something went wrong";
      }

      toast.error(errorMessage);
      throw error; // Re-throw for component level handling if needed
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("auth/logout");
      console.log("reached logoutUser", response);
      if (response.status === 200) {
        console.log("Logged out");
        toast.success("Logged out successfully");
        setAuth(initialState);
        localStorage.removeItem("auth");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const authData = localStorage.getItem("auth");
    console.log(JSON.parse(authData));
    if (authData) {
      const authInfo = JSON.parse(authData);
      setAuth(authInfo);
    }
    setLoading(false);
  }, []);

  const authInformation = {
    ...auth,
    loginUser,
    logoutUser,
    setAuth,
    loading,
  };

  return (
    <AuthContext.Provider value={authInformation}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
