import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Portfolio({ portfolio, updatePortfolio }) {
  const { id, likes } = portfolio;

  function handleClick() {
    fetch(`/portfolios/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((updatedPortfolio) => {
        updatePortfolio(updatedPortfolio);
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });
  }

  const validationSchema = Yup.object({
    commentBody: Yup.string().required(),
  });

  return (
    <div className="Engagement">
      <Formik
        initialValues={{
          commentBody: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          fetch(`/portfolios/${id}/comments`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ body: values.commentBody }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then((updatedPortfolio) => {
              updatePortfolio(updatedPortfolio);
              resetForm();
            })
            .catch((error) => {
              console.error("Error posting comment:", error);
            });
        }}
      >
        <Form>
          <label>
            <Field
              type="text"
              name="commentBody"
              placeholder="Add comment..."
            />
          </label>
          <ErrorMessage
            name="commentBody"
            component="div"
            className="error"
            style={{ color: "red" }}
          />
          <button type="submit">Post Comment</button>
        </Form>
      </Formik>

      <button className="like-button" onClick={handleClick}>
        Likes: {likes}
      </button>
    </div>
  );
}

export default Portfolio;






































// function Portfolio({portfolio, updatePortfolio}) {
//   const {id, likes} = portfolio
//   const [commentBody, setCommentBody] = useState("");


//    function handleClick() {
//      fetch(`/portfolios/${id}`, {
//        method: "PATCH",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify({ likes: likes + 1}), 
//      })
//        .then((res) => {
//          if (!res.ok) {
//            throw new Error(`HTTP error! Status: ${res.status}`);
//          }
//          return res.json();
//        })
//        .then((portfolio) => {
//           updatePortfolio(portfolio)
//        })
//        .catch((error) => {
//          console.error("Error updating likes:", error);
//        });
//    }
  
//   function handleCommentSubmit(e) {
//   e.preventDefault();
  
//   fetch(`/portfolios/${id}/comments`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ body: commentBody }),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((portfolio) => {
//       updatePortfolio(portfolio);
//       setCommentBody("");
//     })
//     .catch((error) => {
//       console.error("Error posting comment:", error);
//     });
// }

   


//     return (
//       <div className="Engagement">
//         <form onSubmit={handleCommentSubmit}>
//           <label>
//             <input
//               type="text"
//               placeholder="Add comment..."
//               value={commentBody}
//               onChange={(e) => setCommentBody(e.target.value)}
//             />
//           </label>
//           <button type="submit">Post Comment</button>
//         </form>
//         <button className="like-button" onClick={handleClick}>
//           Likes: {likes}
//         </button>
//       </div>
//     );
// }

// export default Portfolio;