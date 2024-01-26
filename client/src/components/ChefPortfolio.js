import React, { useEffect, useState } from "react";
import Portfolio from "./Portfolio";
import "../index.css"

function ChefPortfolio (){

const [portfolios, setPortfolios] = useState([]);

const updatePortfolio = (portfolio) => {
  setPortfolios(prevPortfolios => prevPortfolios.map(p => {
    if (p.id !== portfolio.id){
      return p
    } else {
      return portfolio
    }
  }))
}


useEffect(function () {
  fetch("/portfolios")
    .then(function (res) {
      return res.json();
    })
    .then(setPortfolios);
}, []);
  
console.log(portfolios)
  return (
    <div>
      <h1 className="portfolio-text">Chef's Portfolios</h1>
      <div className="portfolio-container">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="portfolio-item">
            <h2>{portfolio.title}</h2>
            <h4>{portfolio.description}</h4>
            <img src={portfolio.image_url} alt={portfolio.title} />
            <h5>Comments:</h5>
            {portfolio.comments.map((c) => {
              return (
                <div key={c.id}>
                  <div className="comment-body">{c.body}</div>
                </div>
              );
            })}
            <Portfolio
              updatePortfolio={updatePortfolio}
              portfolio={portfolio}
            />
          </div>
        ))}
      </div>
    </div>
  );
    

}
export default ChefPortfolio;