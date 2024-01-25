import React, { useState } from "react";

import "../index.css"




function ChefForm() {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    bio: "",
    location: "",
  });
 const [confirmation, setConfirmation] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/chefs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newChef = await response.json();
      console.log("Chef signed up successfully:", newChef);
      setFormData({
        name: "",
        specialty: "",
        bio: "",
        location: "",
      });

      setConfirmation("Chef signed up successfully!");
    } catch (error) {
      console.error("Error signing up chef:", error);
    }
 
  };
  

  return (
    <div className="ChefForm">
      <h2>Join We Chef!</h2>
      {confirmation && <p>{confirmation}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Specialty:
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}



export default ChefForm;











