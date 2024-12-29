import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function HandleAddProject({ setUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function handleSubmit(logo, brand_name, setSubmitting) {
    fetch("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ logo, brand_name }),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            console.log(user);
            // setUser(user);
            navigate('/');
          });
        } else {
          r.json().then((err) => {
            setErrors([err.message || "Invalid login credentials. Please try again."]);
          });
        }
      })
      .catch((err) => {
        setErrors([err.message || "Network error. Please try again later."]);
      })
      .finally(() => {
        setSubmitting(false);  // Ensure submission is completed
      });
  }

  return (
    <div>
      <h1>Add New Project</h1>
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <Formik
        initialValues={{ logo: '', brand_name: '' }}
        validate={values => {
          const errors = {};
          if (!values.logo) {
            errors.logo = 'Required';
          }
          if (!values.brand_name) {
            errors.brand_name = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values.logo, values.brand_name, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Logo: </label>
            <Field type="text" name="logo" />
            <ErrorMessage name="logo" component="div" />
            <br />

            <label>Brand Name: </label>
            <Field type="brand_name" name="brand_name" />
            <ErrorMessage name="brand_name" component="div" />
            <br />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default HandleAddProject;
