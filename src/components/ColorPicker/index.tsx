import { useState } from "react";
import Sketch from "@uiw/react-color-sketch";
import { DEFAULT_HEX, DEFAULT_PRESET_COLORS } from "../ToolBar/color";
import "./index.css";

const ColorPicker = () => {
  const [hex, setHex] = useState(DEFAULT_HEX);
  const [presetColors, setPresetColors] = useState(DEFAULT_PRESET_COLORS);

  const updateRecentColors = (hex: string) => {
    if (!presetColors.includes(hex)) {
      const colors = presetColors.slice(0);
      colors.pop();
      colors.unshift(hex);
      setPresetColors(colors);
    }
  };
  const style = {
    backgroundColor: "#fff",
    boxShadow: "none",
    fontWeight: "lighter",
  };
  return (
    <>
      <Sketch
        style={style}
        color={hex}
        presetColors={presetColors}
        disableAlpha={true}
        onChange={(color) => {
          setHex(color.hex);
          updateRecentColors(hex);
        }}
      />
    </>
  );
};

export default ColorPicker;
