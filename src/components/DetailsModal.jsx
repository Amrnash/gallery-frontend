import React from "react";
import { Modal, Container, Row, Col, Button, Image } from "react-bootstrap";

const DetailsModal = ({ imageUrl, ...props }) => {
  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton>
        <div className="avatar"></div>
        <Modal.Title className="ml-3 mt-2">UserName</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <img src={imageUrl} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">Download</Button>
        <Button variant="danger">Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DetailsModal;
