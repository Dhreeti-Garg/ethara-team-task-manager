import axios from "axios";

const API = axios.create({
  baseURL: "https://ethara-team-task-manager-production-3a83.up.railway.app/api",
});

// ✅ attach token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default API;
