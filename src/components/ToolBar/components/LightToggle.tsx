import React, { useState } from "react";
import sun from "../../../assets/sun.svg";
import moon from "../../../assets/moon.svg";

const LightToggle = () => {
  const [light, setLight] = useState(true);
  const handleChangeLight = () => {
    setLight((previousLight) => !previousLight);
  };
  return (
    <>
      {light ? (
        <img src={sun} onClick={handleChangeLight} />
      ) : (
        <img src={moon} onClick={handleChangeLight} />
      )}
    </>
  );
};

export default LightToggle;
