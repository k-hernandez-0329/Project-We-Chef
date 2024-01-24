import React from "react";
import ChefCard from './ChefCard';
import { Link } from "react-router-dom";


function ChefList ({chefs}) {












    return (
      <div className="chef-list">
        {chefs && chefs.map((chef) => <ChefCard key={chef.id} chef={chef} />)}
      </div>
    );
}
export default ChefList;