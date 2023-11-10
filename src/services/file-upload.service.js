import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

// Fetching photos from the server
const getPhotos = () => {
  return api
    .get("/photos")
    .then((res) => res.data)
    .catch(errorHandler);
};

// Uploading an image to cloudinary
const uploadImage = (file) => {
  return api
    .post("/upload", file)
    .then((res) => res.data)
    .catch(errorHandler);
};

// Create a new photo on the server
const createPhoto = (newPhoto) => {
  return api
    .post("/photos", newPhoto)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  getPhotos,
  uploadImage,
  createPhoto,
};
