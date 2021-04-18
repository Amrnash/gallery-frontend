import React, { useState } from "react";
import UploadImage from "../components/UploadImage";
import ImageItem from "../components/ImageItem";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

const Profile = () => {
  const [imageUrls, setImageUrls] = useState([
    "./0.jpg",
    "./1.jpg",
    "./2.jpg",
    "./3.jpg",
    "./4.jpg",
  ]);
  return (
    <>
      <Container>
        <h1 className="text-secondary text-center my-5">UserName</h1>
        <section className="d-flex justify-content-center w-100">
          <div className="profile-img mb-5" style={{ width: "30%" }}>
            <img
              src="./1.jpg"
              alt="profile image"
              style={{ borderRadius: 5 }}
            />
          </div>
        </section>
        <section
          className="d-flex justify-conent-center"
          style={{ borderBottom: "1px solid #eee" }}
        >
          <p className="lead text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            laudantium accusantium eveniet fugit voluptatum ab eaque, nostrum
            mollitia aspernatur natus quae tenetur, doloremque dolor quis.
            Maxime, est sint maiores, ipsam, quod omnis sit suscipit atque vero
            aut earum libero. Cumque accusantium odit quasi, optio asperiores
            hic odio nulla, officia, facilis molestias nisi. Expedita incidunt
            temporibus aliquid, sint fugit dolores rerum ducimus, voluptatem,
            esse necessitatibus cum enim recusandae harum explicabo debitis
            reprehenderit reiciendis porro inventore? Iure molestiae repudiandae
            ex. Alias similique excepturi, in distinctio corporis itaque
            doloribus repudiandae molestiae numquam est maiores quas pariatur
            recusandae ullam aperiam nulla. Totam, repellendus at!
          </p>
        </section>
        <section>
          <h2 className="text-secondary text-center my-5">My Uploads</h2>
          <Row className="my-2" as="div">
            {imageUrls.map((url, idx) => {
              return (
                <Col xlg={3} lg={4} sm={6} className="my-2" key={idx}>
                  <ImageItem url={url} />
                </Col>
              );
            })}
          </Row>
          <UploadImage />
          <ProgressBar now={100} variant="secondary" className="mt-3 mb-2" />
        </section>
      </Container>
    </>
  );
};
export default Profile;
