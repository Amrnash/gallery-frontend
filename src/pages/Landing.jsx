import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ImageItem from "../components/ImageItem";
import Axios from "../axios";
const Landing = () => {
  const [images, setImages] = useState([]);
  // get the recent images
  useEffect(() => {
    async function getData() {
      const { data } = await Axios.get("/image?limit=10");
      setImages(data);
    }
    getData();
  }, []);
  return (
    <Container>
      <h1 className="text-center mt-5 mb-5 text-secondary">
        Welcome To Gallery
      </h1>
      <Row className="my-2" as="div">
        {images.map((img, idx) => {
          return (
            <Col xlg={3} lg={4} sm={6} className="my-2" key={idx}>
              <ImageItem showData imageDetails={img} modal />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
export default Landing;
