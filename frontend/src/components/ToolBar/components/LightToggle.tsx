import React from "react";
import sun from "../../../assets/sun.svg";
import moon from "../../../assets/moon.svg";
import { useTheme, useThemeDispatch } from "../../../utils/context";
import { setLightMode } from "../../../utils/reducer";

const LightToggle = () => {
  const dispatch = useThemeDispatch();
  const theme = useTheme();
  const imgSrc = theme.isLight ? sun : moon;

  const handleChangeLight = () => {
    dispatch(setLightMode(!theme.isLight));
  };

  return <img src={imgSrc} onClick={handleChangeLight} />;
};

export default LightToggle;
