import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api",
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  if (!token) return request;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default api;
