import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function loginAdmin(email, password) {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return data; // expects { token, user } or similar shape
}

export function getStoredToken() {
  return localStorage.getItem("token");
}

export function getStoredUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function persistSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
