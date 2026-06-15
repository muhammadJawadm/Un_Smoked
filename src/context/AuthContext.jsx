/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useCallback } from "react";
import { loginAdmin, persistSession, clearSession, getStoredToken, getStoredUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser]   = useState(() => getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginAdmin(email, password);

      // API may return the token in different shapes — normalise here
      const receivedToken = data.token ?? data.accessToken ?? data.data?.token;
      const receivedUser  = data.user  ?? data.data?.user  ?? data.admin ?? data.data?.admin ?? {};

      if (!receivedToken) throw new Error("No token received from server.");

      persistSession(receivedToken, receivedUser);
      setToken(receivedToken);
      setUser(receivedUser);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message ??
        err.response?.data?.error ??
        err.message ??
        "Login failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
