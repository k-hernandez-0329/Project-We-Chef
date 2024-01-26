import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);

    };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/Home" className="nav-item">
          Home
        </Link>
        <Link to="/chefs" className="nav-item">
          Chefs
        </Link>
        <Link to="/portfolios" className="nav-item">
          Portfolios
        </Link>
        <Link to="/signup" className="nav-item">
          Sign Up
        </Link>
        <form onSubmit={handleSearchSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;


