
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ChefEditForm = ({ chef, onEdit }) => {
  const formSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    specialty: Yup.string().required("Specialty is required"),
    bio: Yup.string().required("Cannot be left empty"),
    location: Yup.string()
      .required("City, State is required")
      .matches(/^[A-Za-z\s,.'-]+$/, "Location cannot contain numbers."),
  });

  return (
    <Formik
      initialValues={{
        name: chef.name,
        specialty: chef.specialty,
        bio: chef.bio,
        location: chef.location,
      }}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        try {
          // Assuming you have a function like onEdit to handle the editing
          onEdit(values);
        } catch (error) {
          console.error("Error editing chef:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Form>
        <label>
          Name:
          <Field type="text" name="name" />
        </label>
        <p style={{ color: "red" }}>
          <ErrorMessage name="name" />
        </p>

        <label>
          Culinary Role:
          <Field type="text" name="specialty" />
        </label>
        <p style={{ color: "red" }}>
          <ErrorMessage name="specialty" />
        </p>

        <label>
            Bio:
          <Field as="textarea" type="text" name="bio" />
        </label>
        <p style={{ color: "red" }}>
          <ErrorMessage name="bio" />
        </p>

        <label>
          Location:
          <Field type="text" name="location" />
        </label>
        <p style={{ color: "red" }}>
          <ErrorMessage name="location" />
        </p>

        <button type="submit">Save Changes</button>
      </Form>
    </Formik>
  );
};



export default ChefEditForm;
