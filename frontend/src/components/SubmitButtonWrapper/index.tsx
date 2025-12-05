// import React from "react";
import Button from "../Button";
import { useTheme } from "../../utils/context";
import { useState } from "react";
import "./index.css";
// call api's
// check everythings valid
// when everythings valid then change button class name to ready
//
const SubmitButtonWrapper = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState<boolean>(true);
  // const handleClick()
  if (theme.image) {
    console.log(theme.image);
    setDisabled(false);
  }
  return (
    <Button
      disable={disabled}
      className="generate"
      message="Generate Link"
      onClick={() => {
        console.log("clicked!");
      }}
    />
  );
};

export default SubmitButtonWrapper;
