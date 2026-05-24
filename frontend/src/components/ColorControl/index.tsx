import React from 'react';
import Sketch from "@uiw/react-color-sketch";
import PopUp from "../PopUp";

interface ColorControlProps {
  selectorType: string | null;
  color: string;
  isActive: boolean;
  onChange: (color: string) => void;
  onToggle: (selectorType: string | null) => void;
  presetColors: string[];
  onAddPreset: (color: string) => void;
  buttonStyle: React.CSSProperties;
}

const ColorControl = ({ 
  selectorType, 
  color, 
  onChange, 
  isActive, 
  onToggle,
  presetColors,
  onAddPreset,
  buttonStyle
}:ColorControlProps) => {
  // const isOpen = activeSelector === selectorType;

  const handleClose = () => {
    if (color) {
      onAddPreset(color.toUpperCase()); 
    }
    onToggle(selectorType);
  };
  const style = {
    backgroundColor: "#fff",
    boxShadow: "none",
    fontWeight: "lighter",
  };
  const clsName = `theme-picker ${isActive ? "active" : ""}`;
  return (
    <>
      <div
        onClick={() => (isActive ? handleClose() : onToggle(selectorType))}
        className={clsName}
        style={buttonStyle}
      />


        <PopUp isOpen={isActive} onClose={handleClose}>
          <Sketch
            style={style} 
            color={color}
            presetColors={presetColors} 
            disableAlpha={true}
            onChange={(c) => onChange(c.hex)} 
          />
        </PopUp>
    </>
  );
};
export default ColorControl;