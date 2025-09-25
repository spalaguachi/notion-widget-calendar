import "./index.css";
import imgButton from "../../assets/image.svg";
import LightToggle from "./components/LightToggle";
import PopUp from "../PopUp";
import ColorPicker from "../ColorPicker";
import ColorSelector from "./components/ColorSelector";
import { COLOR_TARGET } from "./color";
import { useColorSelector } from "./hooks/useColorSelector";
import { useOuterClick } from "./hooks/useOuterClick";
import { useColorTheme } from "../../utils/context";
import { type Ref } from "react";
//passing refs,hooks,
interface ToolBarViewProps {
  weekColor: string;
  dayColor: string;
  activeSelector: string | null;
  showPopUp: boolean;
  handleColorSelector: (selectorType: string) => void;
  interactiveAreaRef: Ref<HTMLDivElement>;
}

const ToolBarView = ({
  weekColor,
  dayColor,
  activeSelector,
  showPopUp,
  handleColorSelector,
  interactiveAreaRef,
}: ToolBarViewProps) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <div className="color-selector-area" ref={interactiveAreaRef}>
          <ColorSelector
            selectorType={COLOR_TARGET.WEEK}
            isActive={activeSelector === COLOR_TARGET.WEEK}
            onClick={handleColorSelector}
            style={{ backgroundColor: weekColor }}
          />
          <ColorSelector
            selectorType={COLOR_TARGET.DAY}
            isActive={activeSelector === COLOR_TARGET.DAY}
            onClick={handleColorSelector}
            style={{ backgroundColor: dayColor }}
          />
          <PopUp isOpen={showPopUp}>
            <ColorPicker selectorType={activeSelector} />
          </PopUp>
        </div>
        <hr className="divider" />
        <LightToggle />
        <img src={imgButton} alt="default image button" />
      </div>
    </div>
  );
};
const ToolBar = () => {
  const { activeSelector, showPopUp, handleColorSelector, handleClosePopUp } =
    useColorSelector();
  const interactiveAreaRef = useOuterClick(handleClosePopUp, showPopUp);
  const theme = useColorTheme();

  return (
    <ToolBarView
      {...theme}
      activeSelector={activeSelector}
      showPopUp={showPopUp}
      handleColorSelector={handleColorSelector}
      interactiveAreaRef={interactiveAreaRef}
    />
  );
};

export default ToolBar;
