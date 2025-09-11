import React from "react";
import imgUpload from "../../../assets/upload_cloud.svg";

const ImageContainer = () => {
  return (
    <div className="image-container">
      <img src={imgUpload} />
      <h1>Drag and drop file or select file</h1>
      <p>Max. File Size: 5 MB</p>
    </div>
  );
};

export default ImageContainer;
