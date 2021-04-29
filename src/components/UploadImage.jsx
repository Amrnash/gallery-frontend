import React, { useState, useContext } from "react";
import {ProgressBar} from 'react-bootstrap';
import Axios from '../axios'
import { store } from "../store";
const UploadImage = () => {
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  const {state, dispatch} = useContext(store);
  const {user: { user }} = state;
  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    const { name } = selectedFile;
    setFileName(name);
    const form = new FormData();
    form.append("upload", selectedFile);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2Y1MTcxODI0OGJmMzJhYzFhYzRhMSIsImlhdCI6MTYxOTEzMDM0MCwiZXhwIjoxNjIxNzIyMzQwfQ.buHVZ9PzzJBr9Y36xzWRpqTARV8wsHtKZjwJxZ9akJU";
    try {
        await Axios.put(`/user/upload`, form, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: data => setProgress(Math.round(100 * data.loaded / data.total))
    });
      console.log('sending request')
      const data = await Axios.get(`/user/user-uploads/${user._id}`);
      console.log('data: ', data);
      dispatch({type: 'IMAGES_UPDATE', payload: data});
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
