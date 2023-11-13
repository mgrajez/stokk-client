import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.js";
// import axios from "axios";

function AddPhoto() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const fileInput = useRef();
  const navigate = useNavigate();

  // ********  this method submits the form ********
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(description, fileInput.current.files[0]);

    // You'll need a FormData to send all of the information. because we are sending files, not just text

    // In the Form Data, the keys should be the same as your model (preferably)

    // You will need to send a token in your request (You need to be logged in to send a picture!)

    // To send a token, check how the context is doing :)

    const uploadData = new FormData();

    uploadData.append("url", fileInput.current.files[0]);
    uploadData.append("description", description);
    uploadData.append("width", width);
    uploadData.append("height", height);
    uploadData.append("portfolioUrl", portfolioUrl);

    service
      .post(`/photos`, uploadData)
      .then((response) => {
        setUrl("");
        setDescription("");
        setWidth("");
        setHeight("");
        setUserId("");
        setPortfolioUrl("");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Add New Image 🖼️</h2>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Height</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label>Width</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <label>Portfolio URL</label>
        <input
          type="text"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
        />

        <label>Add image</label>
        <input type="file" ref={fileInput} />

        <button type="submit">Save new image</button>
      </form>
    </div>
  );
}

export default AddPhoto;
