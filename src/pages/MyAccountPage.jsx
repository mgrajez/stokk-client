import React, { useEffect, useState } from "react";
import {
  getUserPhotos,
  removeUserPhoto,
  modifyUserPhoto,
} from "../services/service";
import { getFavoritePhotos } from "../services/service";

export default function MyAccountPage() {
  const [userPhotos, setUserPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const fetchFavoritePhotos = async () => {
    try {
      const favorites = await getFavoritePhotos();
      console.log("Favorite photos:", favorites);
      setFavoritePhotos(favorites);
    } catch (error) {
      console.error("Error fetching favorite photos:", error);
    }
  };

  const fetchUserPhotos = async () => {
    try {
      const photos = await getUserPhotos();
      setUserPhotos(photos);
    } catch (error) {
      console.error(error);
    }
  };

  // Removing the photo
  const handleRemovePhoto = async (photoId) => {
    try {
      await removeUserPhoto(photoId);
      // Updating the photo list
      fetchUserPhotos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleModifyPhoto = async () => {
    try {
      await modifyUserPhoto(selectedPhoto._id, {
        description: modifiedDescription,
      });
      handleCloseModal();
      fetchUserPhotos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (photo) => {
    setSelectedPhoto(photo);
    setModifiedDescription(photo.description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPhoto(null);
    setModifiedDescription("");
  };

  useEffect(() => {
    fetchFavoritePhotos();
  }, []);

  useEffect(() => {
    fetchUserPhotos();
  }, []);

  useEffect(() => {
    console.log(userPhotos);
  }, [userPhotos]);

  return (
    <>
      <div>My Account</div>
      <div>
        <h2>My Favorite Photos ❤️</h2>
        {favoritePhotos.length === 0 ? (
          <p>No favorite photos yet.</p>
        ) : (
          <ul>
            {favoritePhotos.map((favorite) => (
              <li key={favorite._id}>
                <img src={favorite.photoId.url} style={{ width: 200 }} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2>My Uploaded Photos 📷</h2>
      {userPhotos.length > 0 ? (
        userPhotos.map((photo) => (
          <div className="" key={photo._id}>
            <p>{photo.description}</p>
            <img src={photo.url} alt="" style={{ width: 200 }} />
            <button onClick={() => handleOpenModal(photo)}>Modify</button>
            <button onClick={() => handleRemovePhoto(photo._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {/* Modal for Modification */}
      {showModal && (
        <div>
          <h3>Modify Photo</h3>
          <label>New Description:</label>
          <input
            type="text"
            value={modifiedDescription}
            onChange={(e) => setModifiedDescription(e.target.value)}
          />
          <button onClick={handleModifyPhoto}>Submit</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      )}
    </>
  );
}
