import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Searchbar.css";

// Passing onSearch prop
function Searchbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // handleSearch function once invoked calls onSearch
  const handleSearch = () => {
    onSearch(searchQuery);
    navigate(`/?q=${searchQuery}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <>
      <div className="search-section">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
}

export default Searchbar;
