import axios from "axios";

const isDev = import.meta.env.DEV;

const api = axios.create({
  // In production, use relative URL so requests go through the Vercel proxy
  baseURL: isDev
    ? import.meta.env.VITE_BASE_URL || "http://localhost:3000"
    : "",
  withCredentials: true,
});

export default api;
