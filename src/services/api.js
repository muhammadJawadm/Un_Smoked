import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Prevent multiple simultaneous session-expired events firing
let sessionExpiredFired = false;

// Global response error handler
api.interceptors.response.use(
  (response) => {
    sessionExpiredFired = false; // reset on any successful call
    return response;
  },
  (error) => {
    const status = error.response?.status;
    // 401 = invalid/missing token, 403 = often returned for expired JWTs
    if ((status === 401 || status === 403) && !sessionExpiredFired) {
      sessionExpiredFired = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Notify React via a custom event so AuthContext can clear its state.
      // ProtectedRoute then redirects to /login via React Router — no hard reload.
      window.dispatchEvent(new CustomEvent("auth:session-expired"));
    }
    return Promise.reject(error);
  }
);

export default api;
