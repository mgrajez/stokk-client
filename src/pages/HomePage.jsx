import { useState, useEffect } from "react";
import service from "./../services/file-upload.service";

function HomePage() {
  const [photos, setPhotos] = useState([]);

  // Run the effect after the initial render to get a list of photos from the server
  useEffect(() => {
    service
      .getPhotos()
      .then((data) => {
        // console.log("data", data);
        setPhotos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="HomePage">
      <h2>Images</h2>
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <p>{photo.description}</p>
            <img src={photo.imageUrl} alt="photo" width="200" />
          </div>
        ))}
    </div>
  );
}

export default HomePage;
