import axios from "axios";

const baseURL =
  "https://examprep-backend-7o6u.onrender.com/api" || "http://localhost:5000/api";

// Central Axios instance. `withCredentials` is required so the httpOnly
// JWT cookie set by the backend is sent on every request.
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize error messages so components can just read `error.message`
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong. Please try again.";
    const errors = error.response?.data?.errors || [];
    return Promise.reject({ message, errors, status: error.response?.status });
  }
);

export default api;
