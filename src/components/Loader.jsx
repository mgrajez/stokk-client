import React from "react";
import "./Loader.css";

function Loader() {
  return (
    // <div className="loader-container">
    //   {/* Your loader content (e.g., spinner, animation, etc.) */}
    //   Loading...
    // </div>
    <div id="loading-container">
      <p id="loading-text">Loading</p>
      <div id="progress-bar"></div>
    </div>
  );
}

export default Loader;
