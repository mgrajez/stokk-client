import React, { useEffect, useState, useRef } from "react";
import {
  getUserPhotos,
  removeUserPhoto,
  modifyUserPhoto,
} from "../services/service";
import { getFavoritePhotos } from "../services/service";
import "../pages/MyAccountPage.css";

export default function MyAccountPage() {
  const [userPhotos, setUserPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    fetchUserPhotos();
  }, []);

  useEffect(() => {
    if (showModal) {
      scrollToBottom();
    }
  }, [showModal]);

  useEffect(() => {
    console.log(userPhotos);
  }, [userPhotos]);

  return (
    <>
      <div className="my-account-title">My Account</div>
      <div className="account-container">
        <div>
          <h2 className="account-titles">My Favorite Photos ❤️</h2>
          {favoritePhotos.length === 0 ? (
            <p className="no-favorite">No favorite photos yet.</p>
          ) : (
            <ul className="favorite-container">
              {favoritePhotos.map((favorite) => (
                <li key={favorite._id}>
                  <img
                    className="favorite-image"
                    src={favorite.photoId.url}
                    style={{ width: 200 }}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <h2 className="account-titles">My Uploaded Photos 📷</h2>
        <div className="uploads-container">
          {userPhotos.length > 0 ? (
            userPhotos.map((photo) => (
              <div className="" key={photo._id}>
                <img src={photo.url} alt="" style={{ width: 200 }} />
                <p className="photo-description">{photo.description}</p>
                <div className="account-buttons">
                  <button
                    className="modify-button"
                    onClick={() => handleOpenModal(photo)}
                  >
                    Modify
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleRemovePhoto(photo._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Modal for Modification */}
        {showModal && (
          <div className="modal-container">
            <h3>Modify Photo 📝</h3>
            <label className="modify-description">New Description:</label>
            <input
              className="modal-input"
              type="text"
              value={modifiedDescription}
              onChange={(e) => setModifiedDescription(e.target.value)}
            />
            <button
              className="modal-button modal-submit"
              onClick={handleModifyPhoto}
            >
              Submit
            </button>
            <button
              className="modal-button modal-cancel"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </>
  );
}
