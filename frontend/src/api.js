import axios from "axios";

// One shared axios object. Every request goes to our Express backend.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Before each request, attach the login token (if the user is logged in)
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem("user");
  if (saved) {
    const { token } = JSON.parse(saved);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Agar token galat/expire ho jaye to apne aap logout karke login page par bhejo
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config?.url?.includes("/auth/");
    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// Helper: get a readable error message from a failed request
export const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong. Please try again.";

export default api;
