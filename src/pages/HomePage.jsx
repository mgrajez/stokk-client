import { useState, useEffect } from "react";
import service from "../services/service";
import {
  addFavorite,
  removeFavorite,
  getFavoritePhotos,
} from "../services/service";

function HomePage() {
  const [photos, setPhotos] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  // Run the effect after the initial render to get a list of photos from the server
  useEffect(() => {
    service
      .get("/photos")
      .then((response) => {
        // console.log("response", response);
        setPhotos(response.data);
      })
      .catch((err) => console.log(err));
    fetchFavoritePhotos();
  }, []);

  const fetchFavoritePhotos = async () => {
    try {
      const favorites = await getFavoritePhotos();
      console.log("Favorite photos:", favorites);
      setFavoritePhotos(favorites.map((fav) => fav.photoId._id));
    } catch (error) {
      console.error("Error fetching favorite photos:", error);
    }
  };

  // Favorite
  const handleFavoriteClick = async (photoId, isFavorite) => {
    try {
      if (isFavorite) {
        await removeFavorite(photoId);
      } else {
        await addFavorite(photoId);
      }

      // This is updating the local state based on the previous state
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? { ...photo, isFavorite: isFavorite ? false : true }
            : photo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Downloading a picture
  const handleDownloadClick = async (photo) => {
    const response = await fetch(photo.url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `download_${photo._id}`;
    link.click();
  };

  console.log(favoritePhotos);

  return (
    <div className="HomePage">
      {photos &&
        photos.map((photo) => {
          const isFav = favoritePhotos.includes(photo._id);
          return (
            <div key={photo._id}>
              <p>{photo.description}</p>
              <img src={photo.url} alt="photo" width="200" />
              <button onClick={() => handleFavoriteClick(photo._id, isFav)}>
                {isFav ? "💔" : "❤️"}
              </button>
              <button onClick={() => handleDownloadClick(photo)}>⇩</button>
            </div>
          );
        })}
    </div>
  );
}

export default HomePage;
