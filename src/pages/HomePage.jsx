import { useState, useEffect } from "react";
import service from "../services/service";
import Searchbar from "../components/Searchbar";
import {
  addFavorite,
  removeFavorite,
  getFavoritePhotos,
} from "../services/service";
import Loader from "../components/Loader";
import "../pages/HomePage.css";

function HomePage() {
  const [photos, setPhotos] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Construct the URL based on whether there is a search query or not
    const url = searchQuery ? `/photos?q=${searchQuery}` : "/photos";

    service
      .get(url)
      .then((response) => {
        console.log("API Response:", response.data);
        setPhotos(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    fetchFavoritePhotos();
  }, [searchQuery]);

  const fetchFavoritePhotos = async () => {
    try {
      const favorites = await getFavoritePhotos();
      console.log("Favorite photos:", favorites);
      setFavoritePhotos(favorites.map((fav) => fav.photoId._id));
    } catch (error) {
      console.error("Error fetching favorite photos:", error.message);
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
            ? { ...photo, isFavorite: !isFavorite ? false : true }
            : photo
        )
      );

      setFavoritePhotos((prevFavorites) =>
        isFavorite
          ? prevFavorites.filter((fav) => fav !== photoId)
          : [...prevFavorites, photoId]
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
    <>
      <Searchbar onSearch={(query) => setSearchQuery(query)} />
      <div className="home-container">
        {loading ? (
          <Loader />
        ) : (
          <div className="home-page">
            {photos &&
              photos.map((photo) => {
                const isFav = favoritePhotos.includes(photo._id);
                return (
                  <div className="image-container" key={photo._id}>
                    {/* <p>{photo.description}</p> */}
                    <img className="home-image" src={photo.url} alt="photo" />
                    <div className="image-buttons">
                      <button
                        className="like-button"
                        onClick={() => handleFavoriteClick(photo._id, isFav)}
                      >
                        {isFav ? "💔" : "❤️"}
                      </button>
                      <button
                        className="download-button"
                        onClick={() => handleDownloadClick(photo)}
                      >
                        ⇩
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
