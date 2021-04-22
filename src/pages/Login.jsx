import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, Form } from "react-bootstrap";
import { store } from "../store";
import Axios from "../axios";
const Login = ({ history }) => {
  const { state, dispatch } = useContext(store);
  const inValidStyles = {
    border: "1px solid red",
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required "),
      password: Yup.string()
        .max(16, "password cannot be more than 16 characters")
        .min(4, "password cannot be less than 4 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        dispatch({ type: "AUTH_REQUEST" });
        const { data } = await Axios.post(
          "/user/login",
          {
            email,
            password,
          }
        );
        dispatch({ type: "AUTH_SUCCESS", payload: data });
        history.push("/profile");
      } catch (error) {
        dispatch({ type: "AUTH_FAIL", payload: error });
      }
    },
  });
  useEffect(() => {
    if(state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state])
  return (
    <>
      <Container className="d-flex justify-content-center flex-column align-items-center mt-5">
        <h1 className="mb-5">Login</h1>
        <Form
          onSubmit={formik.handleSubmit}
          style={{
            width: "60%",
          }}
        >
          <Form.Control
            type="text"
            name="email"
            id="email"
            placeholder="Email Address"
            className={`mt-4`}
            style={formik.errors.email && formik.touched.email && inValidStyles}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <Form.Text style={{ color: "red" }}>
              {formik.errors.email}
            </Form.Text>
          )}
          <Form.Control
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formik.values.password}
            className="mt-4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={
              formik.errors.password && formik.touched.password && inValidStyles
            }
          />
          {formik.errors.password && formik.touched.password && (
            <Form.Text style={{ color: "red" }}>
              {formik.errors.password}
            </Form.Text>
          )}
          <Button
            type="submit"
            variant="secondary"
            style={{ width: "100%" }}
            className="mt-4"
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default Login;
