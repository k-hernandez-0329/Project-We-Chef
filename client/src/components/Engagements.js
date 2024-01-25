import React, { useEffect, useState } from "react";

function Engagements({portfolios_id, likes, updatePortfolio}) {
  const [engagements, setEngagements] = useState([]);
  const [commentBody, setCommentBody] = useState("");

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
  
   function handleCommentSubmit(e) {
  e.preventDefault();
  
  fetch(`/portfolios/${portfolios_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment_body: commentBody }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((newEngagement) => {
      setEngagements([...engagements, newEngagement]);
      setCommentBody("");
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
    });
}

   


    return (
      <div className="Engagement">
        {engagements.map((engagement, index) => (
          <div key={index}>
            <div className="comment-body">{engagement.comment_body}</div>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit}>
          <label>
            Comment:
            <input
              type="text"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </label>
          <button type="submit">Post Comment</button>
        </form>
        <button className="like-button" onClick={handleClick}>
          Likes: {likes}
        </button>
      </div>
    );
}

export default Engagements;