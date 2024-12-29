import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function handleSubmit(username, password, setSubmitting) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
      <h1>Login!</h1>
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values.username, values.password, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Username: </label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
            <br />

            <label>Password: </label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
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

export default LoginForm;
