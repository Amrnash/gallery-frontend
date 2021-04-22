import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Container, Form } from "react-bootstrap";
import { store } from "../store";
import Axios from "../axios";

const Signup = ({ history }) => {
  const inValidStyles = {
    border: "1px solid red",
  };
  const [slelectedPhoto, setSelectedPhoto] = useState(null);
  const { dispatch, state } = useContext(store);
  const isNotMatch = () => {
    if (formik.values.password !== formik.values.confirmPassword) {
      return true;
    } else return false;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "name cannot be more than 16 characters")
        .min(4, "name cannot be less than 4 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required "),
      password: Yup.string()
        .max(16, "password cannot be more than 16 characters")
        .min(4, "password cannot be less than 4 characters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .max(16, "password cannot be more than 16 characters")
        .min(4, "password cannot be less than 4 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { email, password, name, bio } = values;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("bio", bio);
        formData.append("password", password);
        formData.append("avatar", slelectedPhoto, slelectedPhoto.name);
        dispatch({ type: "AUTH_REQUEST" });
        const { data } = await Axios.post(
          "/user/signup",
          formData
        );
        dispatch({ type: "AUTH_SUCCESS", payload: data });
        history.push("/profile");
        localStorage.setItem("user", JSON.stringify(state.user));
      } catch (error) {
        dispatch({ type: "AUTH_FAIL", payload: error });
        console.log(state);
      }
    },
  });
  return (
    <>
      <Container className="d-flex justify-content-center flex-column align-items-center mt-5">
        <h1 className="mb-5">Signup</h1>
        <Form
          onSubmit={formik.handleSubmit}
          style={{
            width: "60%",
          }}
        >
          <Form.Control
            type="text"
            name="name"
            id="name"
            placeholder="Username"
            className={`mt-4`}
            style={formik.errors.name && formik.touched.name && inValidStyles}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <Form.Text style={{ color: "red" }}>{formik.errors.name}</Form.Text>
          )}
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
            type="text"
            name="bio"
            id="bio"
            as="textarea"
            rows={6}
            value={formik.values.bio}
            placeholder="Tell us about yourself"
            className={`mt-4`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
          <Form.Control
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
            value={formik.values.confirmPassword}
            className="mt-4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={
              formik.errors.confirmPassword &&
              formik.touched.confirmPassword &&
              inValidStyles
            }
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <Form.Text style={{ color: "red" }}>
              {formik.errors.confirmPassword}
            </Form.Text>
          )}
          {isNotMatch() && formik.touched.confirmPassword && (
            <Form.Text style={{ color: "red" }}>
              Passwords don't match
            </Form.Text>
          )}
          <Form.File
            label="Upload profile pic"
            name="avatar"
            onChange={(e) => setSelectedPhoto(e.target.files[0])}
          />
          <Button
            variant="secondary"
            style={{ width: "100%" }}
            className="mt-4"
            type="submit"
          >
            Signup
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default Signup;
