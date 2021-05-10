import React, { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { store } from "../store";

const Error = ({ message }) => {
  const { state, dispatch } = useContext(store);
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "RESET_ERROR" });
    }, 3000);
  });
  return <Alert variant="danger">{message}</Alert>;
};

export default Error;
