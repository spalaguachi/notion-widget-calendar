import "./index.css";
import imgButton from "../../assets/image.svg";
import LightToggle from "./components/LightToggle";
import PopUp from "../PopUp";
import ColorPicker from "../ColorPicker";
import ColorSelector from "./components/ColorSelector";
import { COLOR_TARGET } from "./color";
import { useColorSelector } from "./hooks/useColorSelector";
import { useOuterClick } from "./hooks/useOuterClick";

const ToolBar = () => {
  const { activeSelector, showPopUp, handleColorSelector, handleClosePopUp } =
    useColorSelector();
  const interactiveAreaRef = useOuterClick(handleClosePopUp, showPopUp);

  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="color-selector-area" ref={interactiveAreaRef}>
          <ColorSelector
            selectorType={COLOR_TARGET.WEEK}
            isActive={activeSelector === COLOR_TARGET.WEEK}
            onClick={handleColorSelector}
          />
          <ColorSelector
            selectorType={COLOR_TARGET.DAY}
            isActive={activeSelector === COLOR_TARGET.DAY}
            onClick={handleColorSelector}
          />
          <PopUp isOpen={showPopUp}>
            <ColorPicker />
          </PopUp>
        </div>
        <hr className="divider" />
        <LightToggle />
        <img src={imgButton} alt="default image button" />
      </div>
    </div>
  );
};

export default ToolBar;
