import axios from "axios";
import { parseCookies } from "nookies";
import { BASEURL } from "./urlConfigs";

let headers = {
  "Content-Type": "application/json",
  Authorization: "",
};

// if (localStorage.token) {
//   headers.Authorization = "Bearer " + localStorage.token;
// }

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers,
});

export default axiosInstance;

export const axiosAuth = axios.create({
  baseURL: BASEURL,
  headers: { "Content-Type": "application/json" },
});

axiosAuth.interceptors.request.use(
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
