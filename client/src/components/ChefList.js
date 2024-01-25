import React from "react";
import ChefCard from './ChefCard';



function ChefList ({chefs}) {












    return (
      <div className="chef-list">
        {chefs && chefs.map((chef) => <ChefCard key={chef.id} chef={chef} />)}
      </div>
    );
}
export default ChefList;