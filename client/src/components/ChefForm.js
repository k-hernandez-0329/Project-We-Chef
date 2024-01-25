import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "../index.css"




function ChefForm() {
  const formSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    specialty: Yup.string().required("Specialty is required"),
    bio: Yup.string().required("Cannot be left empty"),
    location: Yup.string().required("Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      specialty: "",
      bio: "",
      location: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {{
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
        formik.resetForm();
        formik.setStatus("Chef signed up successfully!");
      } catch (error) {
        console.error("Error signing up chef:", error);
      }
    }},
  });

  return (
    <div className="ChefForm">
      <h2>Join We Chef!</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Specialty:
          <input
            type="text"
            name="specialty"
            value={formik.values.specialty}
            onChange={formik.handleChange}
          />
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
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );

  //   const [formData, setFormData] = useState({
  //     name: "",
  //     specialty: "",
  //     bio: "",
  //     location: "",
  //   });
  //  const [confirmation, setConfirmation] = useState(null);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch("/chefs", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       const newChef = await response.json();
  //       console.log("Chef signed up successfully:", newChef);
  //       setFormData({
  //         name: "",
  //         specialty: "",
  //         bio: "",
  //         location: "",
  //       });

  //       setConfirmation("Chef signed up successfully!");
  //     } catch (error) {
  //       console.error("Error signing up chef:", error);
  //     }

  //   };

  //     <div className="ChefForm">
  //       <h2>Join We Chef!</h2>
  //       {confirmation && <p>{confirmation}</p>}
  //       <form onSubmit={handleSubmit}>
  //         <label>
  //           Name:
  //           <input
  //             type="text"
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label>
  //         <label>
  //           Specialty:
  //           <input
  //             type="text"
  //             name="specialty"
  //             value={formData.specialty}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label>
  //         <label>
  //           Bio:
  //           <textarea
  //             name="bio"
  //             value={formData.bio}
  //             onChange={handleChange}
  //             required
  //           ></textarea>
  //         </label>
  //         <label>
  //           Location:
  //           <input
  //             type="text"
  //             name="location"
  //             value={formData.location}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label>
  //         <button type="submit">Sign Up</button>
  //       </form>
  //     </div>
  //   );
}



export default ChefForm;











