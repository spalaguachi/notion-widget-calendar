import React from "react";
import imgUpload from "../../../assets/upload_cloud.svg";
import imgRemove from "../../../assets/trash.svg";
import { useState, useRef, useEffect } from "react";
import { useThemeDispatch } from "../../../utils/context";
import {
  maxFileSizeBytes,
  fmtBytes,
  imageBgColor,
  hoverImageBgColor,
  acceptedFileTypes,
} from "../ImageContainerHelpers";
import Banner from "../../Banner";
import { editImage } from "../../../utils/reducer";
const ImageContainer = () => {
  interface UploadFile {
    file: File;
    filename: string;
    preview: string;
  }
  const dispatch = useThemeDispatch();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<UploadFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    // if (!image) return;
    // const imageUrl = URL.createObjectURL(image.file);
    // inputRef.current.src = imageUrl;

    // Cleanup function when component unmounts to prevent leakage
    return () => {
      if (image) {
        URL.revokeObjectURL(image.preview);
      }
      // inputRef.current.src = ""; // Clear src just in case
    };
  }, [image]);

  const handleImageChange = () => inputRef.current?.click();

  const addFile = (files: FileList | null) => {
    if (error) {
      setError(null);
    }
    if (!files?.length) return;
    const f = files[0];
    if (f.size > maxFileSizeBytes) {
      setError(
        `${f.name} is too large, max file size is ${fmtBytes(maxFileSizeBytes)}.`,
      );
      if (inputRef.current) inputRef.current!.value = "";
      return;
    }
    if (!acceptedFileTypes.includes(f.type)) {
      setError(
        `${f.type} is not an accepted file type: ${acceptedFileTypes.join(", ")}`,
      );
      return;
    }
    let preview: string;
    try {
      preview = URL.createObjectURL(f);
    } catch {
      setError("Could not load image");
      return;
    }

    const newImage: UploadFile = {
      file: f,
      filename: f.name,
      preview: preview,
    };

    dispatch(editImage(newImage.file));

    setImage((prev) => {
      if (prev?.preview) URL.revokeObjectURL(prev.preview);
      return newImage;
    });
  };

  const removeFile = () => {
    dispatch(editImage(null));
    setImage((prev) => {
      if (!prev) return null;
      if (prev.preview) URL.revokeObjectURL(prev.preview);
      console.log("preview removed...");
      return null;
    });
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    setIsDragging(false);
    // setError(null) should be fixed in addFile...
    addFile(e.dataTransfer.files);
  };
  const onDragOver: React.DragEventHandler<HTMLDivElement> = (
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
  };
  const onDragEnter: React.DragEventHandler<HTMLDivElement> = (
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave: React.DragEventHandler<HTMLDivElement> = (
    e: React.DragEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="image-container">
      {image && (
        <>
          <img className="img-preview" src={image.preview} />
          <div className="img-preview-overlay">
            <p className="img-preview-overlay-filename">{image.filename}</p>
            <img src={imgRemove} onClick={removeFile} />
          </div>
        </>
      )}
      {!image && (
        <>
          <input
            ref={inputRef}
            type="file"
            id="imageInput"
            accept="image/png, image/jpeg"
            hidden
            onChange={(e) => addFile(e.target.files)}
          />
          <div
            className="upload-text"
            onClick={handleImageChange}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            style={{
              backgroundColor: isDragging ? imageBgColor : hoverImageBgColor,
            }}
          >
            <img style={{ width: "49px", height: "49px" }} src={imgUpload} />
            <h1>Drag and drop file or select file</h1>
            <p>Max File Size: {fmtBytes(maxFileSizeBytes)}.</p>
          </div>
          {error && <Banner className="error" message={error} />}
        </>
      )}
    </div>
  );
};

export default ImageContainer;
