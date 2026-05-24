import { useState } from "react";

// custom hook to manage showing the respective color picker for week or day, and closing/when click close
// another custom hook called useClickOutside...
//
// interface ColorSelectorState {
//   activeSelector: string | null;
//   toggle: (selectorType: string|null) => void;
// }

const useColorSelector = () => {
  //initial state
  const [activeSelector, setActiveSelector] = useState<string | null>(null);

  const toggle = (selectorType: string | null) => {
    setActiveSelector((current) => (current === selectorType ? null : selectorType));
  };


  return {
    activeSelector,
    toggle
  };
};

export { useColorSelector };
// export type { ColorSelectorState };
