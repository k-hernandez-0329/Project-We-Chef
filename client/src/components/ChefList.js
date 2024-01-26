import React from "react";
import ChefCard from './ChefCard';




function ChefList ({chefs, onDelete, onEdit}) {








    return (
    <div className="chef-list">
      <h2>Chefs In Your Network:</h2>
      {chefs && chefs.map((chef) => (
        <ChefCard key={chef.id} chef={chef} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

   
export default ChefList;