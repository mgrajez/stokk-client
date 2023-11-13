import React, { useEffect, useState } from "react";
import { getUserPhotos } from "../services/service";

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
            <img src={photo.url} alt="" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
