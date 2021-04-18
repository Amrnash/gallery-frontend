import React, { useState } from "react";

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const { name } = selectedFile;
    console.log(name);
    setFileName(name);
  };
  return (
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
  );
};

export default UploadImage;
