
import React  from "react";
import { useState } from "react";
import ChefEditForm from "./ChefEditForm";
import "../index.css";




function ChefCard ({chef, onDelete, onEdit}) {
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

   
  return  (  
      
      <div className="ChefCard">
        <div>Name: {chef.name}</div>
        <div>Culinary Role: {chef.specialty}</div>
        <div>Location: {chef.location}</div>
        <div>Bio: {chef.bio}</div>
       
        {editing ? (
          <ChefEditForm
            chef={chef}
            onEdit={(editedChef) => {
              onEdit(chef.id, editedChef);
              setEditing(false);
            }}
          />
        ) : (
          <>
            <div>
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={() => onDelete(chef.id)}>Delete</button>
            </div>
          </>
        )}
      </div>
   
  );
   
}





  



export default ChefCard;

