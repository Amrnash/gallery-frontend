import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ImageItem from "../components/ImageItem";
import Paginate from "../components/Paginate";
import Axios from "../axios";
import { store } from "../store";
const Landing = ({ match }) => {
  const [images, setImages] = useState([]);
  const { state, dispatch } = useContext(store);
  const pageNumber = match.params.pageNumber || 1;
  console.log(pageNumber);
  // get the recent images
  useEffect(() => {
    async function getData() {
      if (state.images !== images) {
        const { data } = await Axios.get(`/image?pageNumber=${pageNumber}`);
        setImages(data.images);
        dispatch({ type: "IMAGE_LIST_SUCCESS", payload: data });
      }
    }
    getData();
  }, [state, pageNumber]);
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
      <div className="d-flex justify-content-center">
        <Paginate pages={state.pages} page={state.page} />
      </div>
    </Container>
  );
};
export default Landing;
