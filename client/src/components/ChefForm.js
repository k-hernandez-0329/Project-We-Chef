import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "../index.css"




function ChefForm() {
  const [chefs, setChefs] = useState([]);

  const formSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    specialty: Yup.string().required("Specialty is required"),
    bio: Yup.string().required("Cannot be left empty"),
    location: Yup.string().required("Location is required")
    .matches(/^[A-Za-z\s,.'-]+$/, "Invalid Location."),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      specialty: "",
      bio: "",
      location: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { setSubmitting }) => {
      
        try {
          const response = await fetch("/chefs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          const newChef = await response.json();
          console.log("Chef signed up successfully:", newChef);
          setChefs((prevChefs) => [...prevChefs, newChef]);


          formik.resetForm();
          formik.setStatus("Chef signed up successfully!");
        } catch (error) {
          console.error("Error signing up chef:", error);
        } finally {
          setSubmitting(false);
        }
      }
    },
  );

  return (
    <div className="ChefForm">
      <h2>Join We Chef!</h2>
      {formik.status && <p style={{ color: "green" }}>{formik.status}</p>}
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}> {formik.errors.name}</p>
        </label>
        <label>
          Culinary Role:
          <input
            type="text"
            name="specialty"
            value={formik.values.specialty}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}> {formik.errors.specialty}</p>
        </label>
        <label>
          Bio:
          <textarea
            type="text"
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}> {formik.errors.location}</p>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );

  
}



export default ChefForm;











