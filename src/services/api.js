// import axios from "axios";

// const baseURL =
//   "https://examprep-backend-7o6u.onrender.com/api" || "http://localhost:5000/api";

// // Central Axios instance. `withCredentials` is required so the httpOnly
// // JWT cookie set by the backend is sent on every request.
// const api = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Normalize error messages so components can just read `error.message`
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || "Something went wrong. Please try again.";
//     const errors = error.response?.data?.errors || [];
//     return Promise.reject({ message, errors, status: error.response?.status });
//   }
// );

// export default api;

import axios from "axios";
import { tokenStorage } from "../utils/tokenStorage.js";

const baseURL =
  "https://examprep-backend-7o6u.onrender.com/api" ||
  "http://localhost:5000/api";

// Central Axios instance. `withCredentials` sends the httpOnly JWT cookie
// (the web build's primary auth path). The request interceptor below also
// attaches a Bearer token when one is stored (the Electron build's primary
// auth path, since packaged-app cookie persistence can be unreliable). The
// backend accepts either, so this one instance works for both builds.
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error messages so components can just read `error.message`
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again.";
    const errors = error.response?.data?.errors || [];
    return Promise.reject({ message, errors, status: error.response?.status });
  }
);

export default api;