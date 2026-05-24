import "./index.css";
import LightToggle from "./components/LightToggle";
import {
  COLOR_TARGET,
  DEFAULT_PRESET_COLORS,
} from "./color";
import { useColorSelector } from "./hooks/useColorSelector";
import { useColorTheme, useThemeDispatch } from "../../utils/context";
import { useState } from "react";
import DefaultImage from "./components/DefaultImage";
import ColorControl from "../ColorControl";
import { editDayColor, editWeekColor } from "../../utils/reducer";
//passing refs,hooks,

const ToolBar = () => {
  const { activeSelector, toggle } = useColorSelector();
 
  const theme = useColorTheme();
  const dispatch = useThemeDispatch();
  const [presetColors, setPresetColors] = useState(DEFAULT_PRESET_COLORS);
  const handlePresetColors = (color: string) => {
    const hex = color.toUpperCase();
    if(!presetColors.includes(hex)){
      setPresetColors((prev) => [hex, ...prev.slice(0, -1)]);      
    }
  };
  return (
   <div className="toolbar-container">
      <div className="toolbar">
        <div className="color-selector-area">
      {/* decouple logic so it can have changes: colorselectorgroup<> cs,cs,popup<cp>
       */}
          <ColorControl
            selectorType={COLOR_TARGET.WEEK}
            color= {theme.weekColor}
            isActive={activeSelector === COLOR_TARGET.WEEK}
            onChange={(hex) => dispatch(editWeekColor(hex))}
            onToggle={toggle}
            presetColors={presetColors}
            onAddPreset={handlePresetColors}
            buttonStyle={{ backgroundColor: theme.weekColor }}
          />
          <ColorControl
            selectorType={COLOR_TARGET.DAY}
            color={theme.dayColor}
            isActive={activeSelector === COLOR_TARGET.DAY}
            onChange={(hex)=> dispatch(editDayColor(hex))}
            onToggle={toggle}
            presetColors={presetColors}
            onAddPreset={handlePresetColors}
            buttonStyle={{ backgroundColor: theme.dayColor }}
          />
        </div>
        <hr className="divider" />
        <LightToggle />
        <DefaultImage />
      </div>
    </div>
  );
};

export default ToolBar;
