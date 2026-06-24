import { type ReactNode } from "react";
import "./index.css";

interface PopUpProps {
  isOpen: boolean;
  children: ReactNode;
}

const PopUp = (props: PopUpProps) => {
  if (!props.isOpen) {
    return null;
  }
  return <div className="popUp">{props.children}</div>;
};

export default PopUp;
