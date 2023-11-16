import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.js";
import "../pages/AddPhoto.css";

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
    <>
      <div className="add-photo-page">
        <div className="form-container">
          <h2>Add New Image 🖼️</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="form-label">Height</label>
            <input
              className="form-input"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

            <label className="form-label">Width</label>
            <input
              className="form-input"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />

            <label className="form-label">Portfolio URL</label>
            <input
              className="form-input"
              type="text"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />

            <label className="form-label">Add image</label>
            <input className="file-button" type="file" ref={fileInput} />

            <button className="form-submit" type="submit">
              Save new image
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPhoto;
