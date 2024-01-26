import React, {  useState } from "react";

function Portfolio({portfolio, updatePortfolio}) {
  const {id, likes} = portfolio
  const [commentBody, setCommentBody] = useState("");


   function handleClick() {
     fetch(`/portfolios/${id}`, {
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
  
  fetch(`/portfolios/${id}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: commentBody }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((portfolio) => {
      updatePortfolio(portfolio);
      setCommentBody("");
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
    });
}

   


    return (
      <div className="Engagement">
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

export default Portfolio;