import useAxiosWithAuth from "@/utils/hooks/useAxiosAuth";
import { Middleware } from "@reduxjs/toolkit";

// Create custom middleware
const axiosAuthMiddleware: Middleware = () => (next) => (action) => {
  const apiClient = useAxiosWithAuth();

  if (typeof action === "function") {
    // If action is a function (thunk), inject apiClient as a parameter
    return action(apiClient);
  }

  return next(action);
};

export default axiosAuthMiddleware;
