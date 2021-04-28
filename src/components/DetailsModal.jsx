import React, {useContext} from "react";
import { Modal, Container, Row, Col, Button, Image } from "react-bootstrap";
import { store } from "../store";

const DetailsModal = ({ imageUrl, ...props }) => {
  const {state} = useContext(store);
  const {user: { user }} = state;
  let decoder = new TextDecoder()
  let base64ImageData = new Uint8Array(user.avatar.data)
  base64ImageData = decoder.decode(base64ImageData);
  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton>
        <div className="avatar">
        <img
              src={`data:image/gif;base64,${base64ImageData}`}
              alt="profile image"
              
            />
        </div>
        <Modal.Title className="ml-3 mt-2">{user.name}</Modal.Title>
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
        {<Button variant="danger">Delete</Button>}
      </Modal.Footer>
    </Modal>
  );
};
export default DetailsModal;
