import React, { useEffect, useState } from "react";
import { getUserPhotos } from "../services/service";

export default function MyAccountPage() {
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    const fetchUserPhotos = async () => {
      try {
        const photos = await getUserPhotos();
        setUserPhotos(photos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPhotos();
  }, []);

  return (
    <>
      <div>My Account</div>
      <div>My Uploaded Photos</div>
      {userPhotos.map((photo) => (
        <img
          key={photo._id}
          src={photo.photoUrl}
          alt={photo.photoDescription}
        />
      ))}
    </>
  );
}
