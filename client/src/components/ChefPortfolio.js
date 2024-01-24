import React, { useEffect, useState } from "react";
import Engagement from "./Engagement";
import "../index.css"

function ChefPortfolio (){

const [portfolios, setPortfolios] = useState([]);


useEffect(function () {
  fetch("/portfolios")
    .then(function (res) {
      return res.json();
    })
    .then(setPortfolios);
}, []);
  

  return (
    <div>
      <h2>Chef's Portfolio</h2>
      <div className="portfolio-container">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="portfolio-item">
            <h3>Title: {portfolio.title}</h3>
            <p>Description: {portfolio.description}</p>
            <img src={portfolio.image_url} alt={portfolio.title} />
            <Engagement portfolios_id={portfolio.id} />
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