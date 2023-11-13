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

export const getUserPhotos = async () => {
  try {
    const response = await api.get("/photos/mine");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
