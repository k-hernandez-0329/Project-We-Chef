import React, { useEffect, useState } from "react";
import Engagements from "./Engagements";
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
      <h1>Chef's Portfolios</h1>
      <div className="portfolio-container">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="portfolio-item">
            <h2>{portfolio.title}</h2>
            <h4>{portfolio.description}</h4>
            <img src={portfolio.image_url} alt={portfolio.title} />
            <h5>Comments:</h5>
            <Engagements updatePortfolio={updatePortfolio} likes={portfolio.likes} portfolios_id={portfolio.id} />
          </div>
        ))}
      </div>
    </div>
  );
    




/* //   return (
//     <div>
//       <h2>Chef's Portfolio</h2>
//       <div className="portfolio-container">
//         {portfolios.map((portfolio) => (
//           <div key={portfolio.id} className="portfolio-item">
//             <h3>Title: {portfolio.title}</h3>
//             <p>Description: {portfolio.description}</p>
//             <img src={portfolio.image_url} alt={portfolio.title} />
//             <div className="Engagement">
//               <h3>Engagements:</h3>
//               {engagements &&
//                 engagements.map((engagement, index) => (
//                   <Engagement key={index} engagement={engagement} />
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
   */
      }
export default ChefPortfolio;