import React, { useState, useContext, useEffect } from "react";
import UploadImage from "../components/UploadImage";
import ImageItem from "../components/ImageItem";
import { Container, Row, Col } from "react-bootstrap";
import { store } from "../store";
import Axios from "../axios";
const Profile = () => {
  const { dispatch, state } = useContext(store);
  const [images, setImages] = useState([]);
  const {
    user: { user },
  } = state;
  const {
    user: { token },
  } = state;
  let decoder = new TextDecoder();
  let base64ImageData = new Uint8Array(user.avatar.data);
  base64ImageData = decoder.decode(base64ImageData);
  // fetch the data when the component mount for the first time
  useEffect(() => {
    async function getData() {
      const { data } = await Axios.get("/image/user-images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "IMAGES_UPDATE", payload: data });
    }
    getData();
  }, [dispatch, token]);
  // whenever the state changes if the length
  useEffect(() => {
    async function updateStateWhenUploading() {
      if (state.images) {
        if (state.images.length !== images.length) {
          const { data } = await Axios.get("/image/user-images", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch({ type: "IMAGES_UPDATE", payload: data });
          console.log(data);
          // urls = data.map((obj) => obj.imagePath.split("\\").slice(3).join("/"));
          if (images.length !== data.length) {
            setImages(data);
          }
        }
      }
    }
    updateStateWhenUploading();
  }, [state, dispatch, token]);
  return (
    <>
      <Container>
        <h1 className="text-secondary text-center my-5">{user.name}</h1>
        <section className="d-flex justify-content-center w-100">
          <img
            src={`data:image/gif;base64,${base64ImageData}`}
            alt="profile image"
            style={{
              borderRadius: 50,
              border: "1px solid #eee",
              padding: 5,
              width: 250,
              height: 250,
            }}
          />
        </section>
        <section
          className="d-flex justify-content-center mt-5"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <p className="lead text-center">{user.bio}</p>
        </section>
        <section>
          <h2 className="text-secondary text-center my-5">My Uploads</h2>
          <UploadImage />
          <Row className="my-2" as="div">
            {images.map((img, idx) => {
              return (
                <Col xlg={3} lg={4} sm={6} className="my-2" key={idx}>
                  <ImageItem imageDetails={img} />
                </Col>
              );
            })}
          </Row>
        </section>
      </Container>
    </>
  );
};
export default Profile;
