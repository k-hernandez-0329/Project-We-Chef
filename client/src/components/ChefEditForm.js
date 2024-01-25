import React, { useState } from "react";




const ChefEditForm = ({ chef, onEdit }) => {
  const [editedChef, setEditedChef] = useState({
    name: chef.name,
    bio: chef.bio,
    location: chef.location,
    specialty: chef.specialty,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedChef((prevEditedChef) => ({
      ...prevEditedChef,
      [name]: value,
    }));
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
      </label>
      <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={editedChef.bio}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={editedChef.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Specialty:
        <input
          type="text"
          name="specialty"
          value={editedChef.specialty}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};


export default ChefEditForm;
