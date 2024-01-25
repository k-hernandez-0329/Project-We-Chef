
import React  from "react";
import { useState } from "react";
import ChefEditForm from "./ChefEditForm";
import "../index.css";




function ChefCard ({chef, onDelete, onEdit}) {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleEditSave = (editedChef) => {
    onEdit(chef.id, editedChef);
    setEditing(false);
  };
const isNewChef = chef.id > 15;
const isDeletableChef = chef.id > 15;


  return (
    <div className="ChefCard">
      <div>Name: {chef.name}</div>
      <div>Culinary Role: {chef.specialty}</div>
      <div>Location: {chef.location}</div>
      <div>Bio: {chef.bio}</div>
      {isNewChef && (
        <div className="button-container">
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
      {isDeletableChef && (
        <button onClick={() => onDelete(chef.id)}>Delete</button>
      )}
     
      {editing && <ChefEditForm chef={chef} onEdit={handleEditSave} />}
    </div>
  );
}


  



export default ChefCard;

