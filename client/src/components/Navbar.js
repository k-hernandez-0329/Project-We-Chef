import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Navbar = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('')


  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);

  };


  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/chefs">Chefs</Link>
      <Link to="/portfolios">Portfolios</Link>
      <Link to="/signup">Sign Up</Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
