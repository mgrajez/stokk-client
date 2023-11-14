import axios from "axios";

const baseURL =
  `${process.env.VITE_BACKEND}/api` || "https://stokk.netlify.app";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  if (!token) return request;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export const getUserPhotos = async () => {
  try {
    const response = await api.get(`${baseURL}/photos/mine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const modifyUserPhoto = async (photoId, updatedData) => {
  try {
    await api.put(`${baseURL}/photos/${photoId}`, updatedData);
  } catch (error) {
    throw error;
  }
};

export const removeUserPhoto = async (photoId) => {
  try {
    await api.delete(`${baseURL}/photos/${photoId}`);
  } catch (error) {
    throw error;
  }
};

export default api;
