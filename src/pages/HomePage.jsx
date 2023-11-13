import { useState, useEffect } from "react";
import service from "../services/service";

function HomePage() {
  const [photos, setPhotos] = useState([]);

  // Run the effect after the initial render to get a list of photos from the server
  useEffect(() => {
    service
      .get("/photos")
      .then((response) => {
        // console.log("response", response);
        setPhotos(response.data);
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
            <img src={photo.url} alt="photo" width="200" />
          </div>
        ))}
    </div>
  );
}

export default HomePage;
