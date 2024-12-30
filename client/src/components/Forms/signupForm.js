import React from 'react';
 import { Formik, Form, Field, ErrorMessage } from 'formik';
 import { useNavigate } from 'react-router-dom';


function SignupForm(){
  const navigate = useNavigate();
    function handleSubmit(name, username, password) {
         
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, username, password }),
        })
        .then((r) => {
          if (r.ok) {
            navigate('/')
          }
        });
      }
    return(
    <div>
      <h1>Signup!</h1>
      <Formik
        initialValues={{ username: '', password: '', name:'' }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]/i.test(values.username)
          ) {
            errors.username = 'Invalid username';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleSubmit(values.name, values.username, values.password)

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Name: </label>
            <Field type="name" name="name" />
            <ErrorMessage name="name" component="div" />
            <br></br>

            <label>username: </label>
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />
            <br></br>

            <label>password: </label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <br></br>
            <br></br>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>)
};
  
  export default SignupForm;