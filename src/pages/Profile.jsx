import React, { useState, useContext, useEffect } from "react";
import UploadImage from "../components/UploadImage";
import ImageItem from "../components/ImageItem";
import { Container, Row, Col } from "react-bootstrap";
import { store } from '../store';
import Axios from '../axios';
const Profile = () => {
  const { dispatch, state} = useContext(store);
  const [imageUrls, setImageUrls] = useState([]);
  const {user: { user }} = state;
  let decoder = new TextDecoder()
  let base64ImageData = new Uint8Array(user.avatar.data)
  base64ImageData = decoder.decode(base64ImageData);
  // fetch the user images from the backend
  useEffect(() => {
    const buffer = [];
    user.images.forEach((url) => {
      const imgName = url.split('\\')[5];
      buffer.push(`/uploads/${imgName}`);
    })
    setImageUrls(buffer)
  }, [state])
  return (
    <>
      <Container>
        <h1 className="text-secondary text-center my-5">{user.name}</h1>
        <section className="d-flex justify-content-center w-100">
            <img
              src={`data:image/gif;base64,${base64ImageData}`}
              alt="profile image"
              style={{ borderRadius: 5, border: "1px solid #eee", padding: 5, width: 250,  height: 250 }}
            />
        </section>
        <section
          className="d-flex justify-content-center mt-5"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <p className="lead text-center">
            {user.bio}
          </p>
        </section>
        <section>
          <h2 className="text-secondary text-center my-5">My Uploads</h2>
          <Row className="my-2" as="div">
            {imageUrls.map((url, idx) => {
              return (
                <Col xlg={3} lg={4} sm={6} className="my-2" key={idx}>
                  <ImageItem url={'http://localhost:7000' + url} />
                </Col>
              );
            })}
          </Row>
          <UploadImage />
        </section>
      </Container>
    </>
  );
};
export default Profile;
