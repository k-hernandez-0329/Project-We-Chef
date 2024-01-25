import React, { useState } from "react";

const ChefEditForm = ({ chef, onEdit }) => {
  const [editedChef, setEditedChef] = useState({
    name: chef.name,
    bio: chef.bio,
    location: chef.location,
    specialty: chef.specialty
  });

  const handleChange = (e) => {
    setEditedChef({
      ...editedChef,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedChef);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedChef.name}
          onChange={handleChange}
        />
        Bio:
        <input
          type="text"
          name="bio"
          value={editedChef.bio}
          onChange={handleChange}
        />
        Location:
        <input
          type="text"
          name="location"
          value={editedChef.location}
          onChange={handleChange}
        />
        Specialty:
        <input
          type="text"
          name="specialty"
          value={editedChef.specialty}
          onChange={handleChange}
        />
      </label>
      {/* Add other input fields for editing other properties */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default ChefEditForm;
