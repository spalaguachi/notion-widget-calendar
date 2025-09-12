import React from "react";
import "./index.css";
import imgButton from "../../assets/image.svg";
import ThemePicker from "./components/ThemePicker";
import LightToggle from "./components/LightToggle";

const ToolBar = () => {
  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <ThemePicker className="week theme-picker" />
        <ThemePicker className="day theme-picker" />
        <hr className="divider" />
        <LightToggle />
        <img src={imgButton} alt="default image button" />
      </div>
    </div>
  );
};

export default ToolBar;
