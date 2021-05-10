import React, { useState, useEffect } from "react";
import DetailsModal from "../components/DetailsModal";
import Axios from "../axios";
const ImageItem = ({ imageDetails, showData, modal }) => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);
  async function getUserByID() {
    const { data } = await Axios.get(`/user/${imageDetails.user}`);
    setUser(data);
  }
  useEffect(() => {
    getUserByID();
  }, [setUser]);
  const url =
    "http://localhost:7000/" +
    imageDetails.imagePath.split("\\").slice(5).join("/");
  return (
    <>
      <div className="img-container" onClick={() => setModalShow(true)}>
        <img src={url} />
        {/* {showData && (
          <div className="overlay">
            <h1 className="overlay-text">some data</h1>
          </div>
        )} */}
      </div>
      {modal && user && (
        <DetailsModal
          imageUrl={url}
          imageId={imageDetails._id}
          user={user}
          show={modalShow}
          setShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default ImageItem;
