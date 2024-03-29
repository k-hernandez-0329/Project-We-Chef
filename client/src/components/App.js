import React, { useEffect, useState } from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import ChefList from "./ChefList";
import ChefPortfolio from "./ChefPortfolio";
import "../index.css";
import Navbar from "./Navbar";
import Home from "./Home";
import ChefForm from './ChefForm';
import Footer from "./Footer";
import ScrollToTopButton from "./Scroll";







function App() {


   const [chef, setChefs] = useState([]);
   const [filteredChefs, setFilteredChefs] = useState([]);
   useEffect(() => {
     document.title = "WeChef";
     return () => {
       document.title = "Default Tab Name";
     };
   }, []); 

   useEffect(() => {
     fetch("/chefs")
       .then((res) => res.json())
       .then((data) => {
          setChefs(data);
          setFilteredChefs(data)
       });
   }, []);
 



  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete profile from network?");
    if (!shouldDelete) {
      return; 
    }
    fetch(`/chefs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          setChefs((prevChefs) => prevChefs.filter((chef) => chef.id !== id));
          setFilteredChefs((prevChefs) =>
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
          fetch("/chefs")
            .then((res) => res.json())
            .then((data) => {
              setChefs(data);
              setFilteredChefs(data);
            });
        } else {
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
      <Navbar onSearch={handleSearch} />
      <ScrollToTopButton />
      <Switch>
        <Route path="/chefs">
          <ChefList
            chefs={filteredChefs}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Route>
        <Route path="/portfolios" component={ChefPortfolio} />
        <Route path="/signup" component={ChefForm} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </div>
  );



}

export default App;

