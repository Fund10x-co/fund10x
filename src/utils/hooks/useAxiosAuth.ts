import axios, { AxiosInstance } from "axios";
import { useEffect } from "react";
import { parseCookies } from "nookies"; // Assuming you're using next-cookies or similar package to parse cookies
import { BASEURL } from "../config/urlConfigs";

const useAxiosWithAuth = () => {
  const apiClient: AxiosInstance = axios.create({
    baseURL: BASEURL,
  });

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        // Get the token from cookies
        const cookies = parseCookies(); // Parse cookies
        const token = cookies.token;

        // If token exists, set Authorization header
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Clean up interceptor on unmount
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
    };
  }, []); // Only run once on mount

  return apiClient;
};

export default useAxiosWithAuth;
