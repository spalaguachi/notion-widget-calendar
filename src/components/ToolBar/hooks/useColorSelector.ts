import { useState } from "react";

// custom hook to manage showing the respective color picker for week or day, and closing/when click close
// another custom hook called useClickOutside...
//
interface ColorSelectorState {
  activeSelector: string | null;
  showPopUp: boolean;
  handleColorSelector: (selectorType: string) => void;
  handleClosePopUp: () => void;
}

const useColorSelector = (): ColorSelectorState => {
  //initial state
  const [showPopUp, setShowPopUp] = useState(false);
  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const handleColorSelector = (selectorType: string) => {
    const wasSameSelector = activeSelector === selectorType;
    setShowPopUp(!wasSameSelector);
    setActiveSelector(wasSameSelector ? null : selectorType);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
    setActiveSelector(null);
  };
  return {
    activeSelector,
    showPopUp,
    handleColorSelector,
    handleClosePopUp,
  };
};

export { useColorSelector };
export type { ColorSelectorState };
