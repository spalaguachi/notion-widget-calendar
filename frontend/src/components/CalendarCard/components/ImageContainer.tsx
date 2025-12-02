import React from "react";
import imgUpload from "../../../assets/upload_cloud.svg";
import { useState } from "react";

const ImageContainer = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          if (result) {
            setImage(result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const uploadImage = () => {
    if (image) {
      // image, name on top when hover, click to change file, small checkmark to say uploaded?
      return (
        <>
          <img className="uploaded-img" src={image} />
        </>
      );
    }
    return (
      <>
        <img src={imgUpload} />
        <h1>Drag and drop file or select file</h1>
        <p>Max. File Size: 5 MB</p>
        <input
          type="file"
          id="imageInput"
          accept="image/png, image/jpg, image/jpg"
          onChange={handleImageChange}
        />
      </>
    );
  };
  return <div className="image-container">{uploadImage()}</div>;
};

export default ImageContainer;
