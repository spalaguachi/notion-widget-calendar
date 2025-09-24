import { useState } from "react";
import Sketch from "@uiw/react-color-sketch";
import { DEFAULT_PRESET_COLORS } from "../ToolBar/color";
import "./index.css";
import { useTheme, useThemeDispatch } from "../../utils/context";
import { COLOR_TARGET } from "../ToolBar/color";
import { editDayColor, editWeekColor } from "../../utils/reducer";
interface ColorPickerProps {
  selectorType: string | null;
}

const ColorPicker = ({ selectorType }: ColorPickerProps) => {
  //config -assigns action for dispatch
  const dispatch = useThemeDispatch();
  const theme = useTheme();
  const hex =
    selectorType == COLOR_TARGET.WEEK ? theme.weekColor : theme.dayColor;

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
          if (selectorType === COLOR_TARGET.WEEK) {
            dispatch(editWeekColor(color.hex));
          } else {
            dispatch(editDayColor(color.hex));
          }
          updateRecentColors(color.hex);
        }}
      />
    </>
  );
};

export default ColorPicker;
