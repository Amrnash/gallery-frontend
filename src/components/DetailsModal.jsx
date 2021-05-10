import React, { useContext } from "react";
import { store } from "../store";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
// import Axios from "../axios";
import axios from "axios";

const DetailsModal = ({ imageUrl, user, imageId, setShow, ...props }) => {
  let decoder = new TextDecoder();
  let base64ImageData = new Uint8Array(user.avatar.data);
  base64ImageData = decoder.decode(base64ImageData);
  const { state, dispatch } = useContext(store);
  const {
    user: { user: currentUser },
  } = state;
  const {
    user: { token },
  } = state;
  const handleDownload = () => {
    axios({
      url: `http://localhost:7000/api/image/download/${imageId}`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
    });
  };
  const handleDelete = async () => {
    await axios.delete(`http://localhost:7000/api/image/remove/${imageId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "IMAGES_UPDATE" });
    setShow(false);
  };
  const currentUserId = currentUser ? currentUser._id : "";
  return (
    <Modal {...props} centered size="lg">
      <Modal.Header closeButton>
        <div className="avatar">
          {user && base64ImageData && (
            <img
              src={`data:image/gif;base64,${base64ImageData}`}
              alt="profile image"
              style={{
                borderRadius: 50,
              }}
            />
          )}
        </div>
        {user && <Modal.Title className="ml-3 mt-2">{user.name}</Modal.Title>}
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
        <Button variant="success" onClick={handleDownload}>
          Download
        </Button>
        {currentUserId === user._id && (
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
export default DetailsModal;
