import React from "react";
import ChefCard from './ChefCard';



function ChefList ({chefs, onDelete, onEdit}) {












    return (
    <div className="chef-list">
      <h2>Chefs In Network:</h2>
      {chefs && chefs.map((chef) => (
        <ChefCard key={chef.id} chef={chef} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
      // <div className="chef-list">
      //   {chefs &&
      //     chefs.map((chef) => (
      //       <div key={chef.id} className="chef-card">
      //         <ChefCard chef={chef} />
      //         <button className="delete-btn" onClick={() => onDelete(chef.id)}>Delete</button>
      //       </div>
      //     ))}
      // </div>
      
   
export default ChefList;