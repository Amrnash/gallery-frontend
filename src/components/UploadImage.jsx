import React, { useState, useContext } from "react";
import { ProgressBar } from "react-bootstrap";
import Axios from "../axios";
import { store } from "../store";
const UploadImage = () => {
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  const { state, dispatch } = useContext(store);
  const {
    user: { token },
  } = state;
  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    const { name } = selectedFile;
    setFileName(name);
    const form = new FormData();
    form.append("upload", selectedFile);
    try {
      await Axios.put(`/user/upload`, form, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (data) =>
          setProgress(Math.round((100 * data.loaded) / data.total)),
      });
      setProgress(0);
      const { data } = await Axios.get(`/image/user-images`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "IMAGES_UPDATE", payload: data });
      console.log("dispatched");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="file-input d-flex justify-content-center align-items-center mt-5">
        <input
          type="file"
          onChange={(e) => handleChange(e)}
          className="file"
          id="file"
        />
        <label htmlFor="file">+</label>
        <p class="file-name mt-5">{fileName}</p>
      </div>
      {progress ? (
        <ProgressBar
          now={progress}
          variant="secondary"
          className="mt-3 mb-5"
          label={`${progress}%`}
        />
      ) : null}
    </>
  );
};

export default UploadImage;
