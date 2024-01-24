import React, { useEffect, useState } from "react";
import { Switch, Route} from "react-router-dom";
import Header from "./Header";
import ChefList from "./ChefList";
import ChefPortfolio from "./ChefPortfolio";
import "../index.css";
import Navbar from "./Navbar";
import Home from "./Home";

;




function App() {
  


   const [chef, setChefs] = useState([]);

   useEffect(() => {
     fetch("/chefs")
       .then((res) => res.json())
       .then(setChefs);
   }, []);
 








  return (
    <div className="App">
      <Header />
      <Navbar />
      <Switch>
        <Route path="/chefs"> <ChefList chefs={chef} /></Route>
        <Route path="/portfolios" component={ChefPortfolio} />
        <Route path="/" component={Home} />
      </Switch>
      
    </div>
  );



}

export default App;
