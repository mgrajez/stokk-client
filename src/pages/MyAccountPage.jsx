import React, { useEffect, useState } from "react";
import { getUserPhotos, removeUserPhoto } from "../services/service";

export default function MyAccountPage() {
  const [userPhotos, setUserPhotos] = useState([]);

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

  useEffect(() => {
    fetchUserPhotos();
  }, []);

  useEffect(() => {
    console.log(userPhotos);
  }, [userPhotos]);

  return (
    <>
      <div>My Account</div>
      <div>My Uploaded Photos</div>
      {userPhotos.length > 0 ? (
        userPhotos.map((photo) => (
          <div className="" key={photo._id}>
            <img src={photo.url} alt="" style={{ width: 200 }} />
            <button onClick={() => handleRemovePhoto(photo._id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
