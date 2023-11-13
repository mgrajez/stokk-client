import React, { useEffect, useState } from "react";
import {
  getUserPhotos,
  removeUserPhoto,
  modifyUserPhoto,
} from "../services/service";

export default function MyAccountPage() {
  const [userPhotos, setUserPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [modifiedDescription, setModifiedDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

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
    fetchUserPhotos();
  }, []);

  useEffect(() => {
    console.log(userPhotos);
  }, [userPhotos]);

  return (
    <>
      <div>My Account</div>
      <div>My Uploaded Photos 📷</div>
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
