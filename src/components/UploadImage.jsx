import React, { useState, useContext } from "react";
import {ProgressBar} from 'react-bootstrap';
import Axios from '../axios'
const UploadImage = () => {
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0)
  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    const { name } = selectedFile;
    setFileName(name);
    const form = new FormData();
    form.append("upload", selectedFile);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2M5YjRlMjIyMmI2MGYzYzZkYmZkYyIsImlhdCI6MTYxODc3ODk1OSwiZXhwIjoxNjIxMzcwOTU5fQ.SVPBELSY9m79Xh9YPBVDSqiQLOzuBRk1o6DfAN9aAM4";
    try {
      const { data } = await Axios.put(`/user/upload`, form, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: data => setProgress(Math.round(100 * data.loaded / data.total))
    });
      console.log(data);      
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
      <ProgressBar now={progress} variant="secondary" className="mt-3 mb-5" label={`${progress}%`} />
    </>
  );
};

export default UploadImage;
