import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="loading-container">
      <p className="loading-text">Loading</p>
      <div className="progress-bar"></div>
    </div>
  );
}

export default Loader;
