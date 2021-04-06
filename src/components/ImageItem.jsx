import React, { useState } from "react";
import DetailsModal from "../components/DetailsModal";
const ImageItem = ({ url }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className="img-container" onClick={() => setModalShow(true)}>
        <img src={url} />
        <div className="overlay">
          <h1 className="overlay-text">some data</h1>
        </div>
      </div>
      <DetailsModal
        imageUrl={url}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default ImageItem;
