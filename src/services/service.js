import axios from "axios";

const baseURL =
  `${import.meta.env.VITE_BACKEND_URL}` || "https://stokk.netlify.app";

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
    const response = await api.get(`/photos/mine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const modifyUserPhoto = async (photoId, updatedData) => {
  try {
    await api.put(`/photos/${photoId}`, updatedData);
  } catch (error) {
    throw error;
  }
};

export const removeUserPhoto = async (photoId) => {
  try {
    await api.delete(`/photos/${photoId}`);
  } catch (error) {
    throw error;
  }
};

export const addFavorite = async (photoId) => {
  try {
    await api.post(`/favorites/${photoId}`);
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (favoriteId) => {
  try {
    await api.delete(`/favorites/${favoriteId}`);
  } catch (error) {
    throw error;
  }
};

export const getFavoritePhotos = async () => {
  try {
    const response = await api.get("/favorites");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
