import React, { useEffect, useState } from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import ChefList from "./ChefList";
import ChefPortfolio from "./ChefPortfolio";
import "../index.css";
import Navbar from "./Navbar";
import Home from "./Home";
import ChefForm from './ChefForm';







function App() {
  


   const [chef, setChefs] = useState([]);
   const [filteredChefs, setFilteredChefs] = useState([]);

   useEffect(() => {
     fetch("/chefs")
       .then((res) => res.json())
       .then((data) => {
          setChefs(data);
          setFilteredChefs(data)
       });
   }, []);
 
   const handleDelete = (id) => {
     fetch(`/chefs/${id}`, {
       method: "DELETE",
       headers: {
         "Content-Type": "application/json",
        
       },
     })
       .then((res) => {
         if (res.ok) {
         
           setChefs((prevChefs) =>
             prevChefs.filter((chef) => chef.id !== id)
           );
         } else {
    
           console.error("Failed to delete chef");
         }
       })
       .catch((error) => {
         console.error("Error during delete request:", error);
       });
   };

const handleEdit = (chefId, editedChef) => {
  fetch(`/chefs/${chefId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedChef),
  })
    .then((res) => {
      if (res.ok) {
        // If the update was successful, refresh the chef list
        fetch("/chefs")
          .then((res) => res.json())
          .then(setChefs);
      } else {
        // Handle error scenarios if needed
        console.error("Failed to update chef");
      }
    })
    .catch((error) => {
      console.error("Error during update request:", error);
    });
};

const handleSearch = (query) => {
  const newFilteredChefs = chef.filter(
    (chef) =>
      chef.name.toLowerCase().includes(query.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(query.toLowerCase())

  );
  setFilteredChefs(newFilteredChefs)
}




  return (
    <div className="App">
      <Header />
      <Navbar onSearch={handleSearch}/>

      <Switch>
        <Route path="/chefs">
          <ChefList chefs={filteredChefs}  onDelete={handleDelete} onEdit={handleEdit} />
        </Route>
        <Route path="/portfolios" component={ChefPortfolio} />
        <Route path="/signup" component={ChefForm} />
        <Route path="/" component={Home} />
      </Switch>
      
    </div>
  );



}

export default App;

// chefs = { chef };