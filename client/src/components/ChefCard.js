
import React  from "react";
import "../index.css";




function ChefCard ({chef}) {
   
  return (
    <div className="ChefCard">
      <div>{chef.name}</div>
      <div>{chef.specialty}</div>
      <div>{chef.location}</div>
      <div>{chef.bio}</div>

      
    </div>
  );
}


export default ChefCard;

