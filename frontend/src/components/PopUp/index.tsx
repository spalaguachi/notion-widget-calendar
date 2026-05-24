import { type ReactNode } from "react";
import "./index.css";
import { useOuterClick } from "../ToolBar/hooks/useOuterClick";
interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopUp = (props: PopUpProps) => {
  const containerRef = useOuterClick(props.onClose,props.isOpen);
  if (!props.isOpen) {
    return null;
  }
  return <div ref={containerRef} className="popUp">{props.children}</div>;
};

export default PopUp;
