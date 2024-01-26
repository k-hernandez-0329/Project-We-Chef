import React from "react";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

import "../index.css";


function Home(){







return (
  <div className="centered-content">

    <div className="culinary-container">
      <h1>Welcome to WeChef!</h1>
      <h3>A Culinary Social Network</h3>
      <p>Discover and connect with talented chefs around the world!</p>

      <p className="culinary-paragraph">
        Welcome to the culinary world, where chefs are artists crafting unique
        dining experiences. Unlike traditional professions, chefs face a
        challenge in sharing their portfolios. Culinary creations are fleeting,
        existing in taste, aroma, and texture. In a world dominated by visual
        platforms like LinkedIn, showcasing the essence of a chef's talent
        becomes a unique hurdle. Beyond the final dish, a chef's artistry lies
        in the meticulous process, precision, and artistic choices made. Join us
        in celebrating the culinary industry, where passion meets precision. In
        the absence of a dedicated platform, we aim to create a space for chefs
        to share their stories and connect. Let's appreciate the extraordinary
        talents that make the culinary world truly exceptional.
      </p>
      <Link to="/signup">
        <button className="signup-button">Sign Up Now</button>
      </Link>
    </div>
  </div>
);
};

export default Home;

