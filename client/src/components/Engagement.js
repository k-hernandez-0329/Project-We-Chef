import React, { useEffect, useState } from "react";

function Engagement({portfolios_id}) {
  const [engagements, setEngagements] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

   useEffect(() => {
     fetch(`/portfolios/${portfolios_id}/engagements`)
     .then((res) => res.json())
     .then((data) => {
       setEngagements(data);
       
       const likes = data.reduce(
         (total, engagement) => total + engagement.likes,
         0
       );
       setTotalLikes(likes);
     });
   }, [portfolios_id]);





   function handleClick() {
     // Assuming 'updatedLikes' is derived from 'totalLikes'
     fetch(`/portfolios/${portfolios_id}/likes`, {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ likes: totalLikes + 1}), // Use the correct variable here
     })
       .then((res) => {
         if (!res.ok) {
           throw new Error(`HTTP error! Status: ${res.status}`);
         }
         return res.json();
       })
       .then((updatedEngagements) => {
         const updatedLikes = updatedEngagements.reduce(
           (total, engagement) => total + engagement.likes,
           0
         );
         // Update state to reflect the changes
         setEngagements(updatedEngagements);
         setTotalLikes(parseInt(updatedLikes, 10));
       })
       .catch((error) => {
         console.error("Error updating likes:", error);
       });
   }


    return (
      <div className="Engagement">
        {engagements.map((engagement, index) => (
          <div key={index}>
            <div className="comment-body">{engagement.comment_body}</div>
          </div>
        ))}
       
          <button className="like-button" onClick={handleClick}>Likes: {totalLikes}</button>
        
      </div>
    );
}

export default Engagement;