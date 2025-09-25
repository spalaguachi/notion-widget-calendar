import React from "react";
import imgButton from "../../../assets/image_outline.svg";
import imgButtonDisabled from "../../../assets/grey_image_outline.svg";
import { useTheme, useThemeDispatch } from "../../../utils/context";
import { setDefaultImage } from "../../../utils/reducer";

const DefaultImage = () => {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const imgSrc = theme.isDefaultImage ? imgButtonDisabled : imgButton;
  const handleClick = () => {
    if (!theme.isDefaultImage) {
      dispatch(setDefaultImage(true));
    }
  };
  return <img src={imgSrc} alt="default image button" onClick={handleClick} />;
};

export default DefaultImage;
