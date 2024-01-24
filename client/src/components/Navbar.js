import React from "react";
import { Link } from "react-router-dom";
import "../index.css"

const Navbar = () => {
  return (
    <nav>
      <Link to="/Home">Home</Link>
      <Link to="/chefs">Chefs</Link>
      <Link to="/portfolios">Portfolios</Link>
    </nav>
  );
};

export default Navbar;
