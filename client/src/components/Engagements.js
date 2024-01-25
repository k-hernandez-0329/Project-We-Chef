import React, { useEffect, useState } from "react";

function Engagements({portfolios_id, likes, updatePortfolio}) {
  const [engagements, setEngagements] = useState([]);

   useEffect(() => {
     fetch(`/portfolios/${portfolios_id}/engagements`)
     .then((res) => res.json())
     .then((data) => {
       setEngagements(data);
     });
   }, [portfolios_id]);





   function handleClick() {
     fetch(`/portfolios/${portfolios_id}`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ likes: likes + 1}), 
     })
       .then((res) => {
         if (!res.ok) {
           throw new Error(`HTTP error! Status: ${res.status}`);
         }
         return res.json();
       })
       .then((portfolio) => {
          updatePortfolio(portfolio)
       })
       .catch((error) => {
         console.error("Error updating likes:", error);
       });
   }


    return (
      <div className="Engagement">
        {engagements.map((engagement, index) => (
          <div key={index}>
            Comments:
            <div className="comment-body">{engagement.comment_body}</div>
          </div>
        ))}
       
          <button className="like-button" onClick={handleClick}>Likes: {likes}</button>
        
      </div>
    );
}

export default Engagements;