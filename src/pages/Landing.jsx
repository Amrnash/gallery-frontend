import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import UploadImage from "../components/UploadImage";
import ImageItem from "../components/ImageItem";
const Landing = () => {
  const [imageUrls, setImageUrls] = useState([
    "./0.jpg",
    "./1.jpg",
    "./2.jpg",
    "./3.jpg",
    "./4.jpg",
  ]);
  return (
    <Container>
      <h1 className="text-center mt-5 mb-5 text-secondary">
        Welcome To Gallery
      </h1>
      <Row className="my-2" as="div">
        {imageUrls.map((url, idx) => {
          return (
            <Col xlg={3} lg={4} sm={6} className="my-2" key={idx}>
              <ImageItem url={url} showData />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Landing;
