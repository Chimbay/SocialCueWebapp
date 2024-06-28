import React, { useState } from "react";
import style from "./index.module.css";

import logo from "../../images/logo.png";
import cue from "../../images/cue.png";

export default function Popup() {
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  const handleClose = () => {
    setIsVisible(false); // Function to hide the component
  };

  if (!isVisible) {
    return null; // Return null if the component is not visible
  }

  return (
    <div className={style.popup}>
      <div className={style.popupNav}>
        <img className={style.logoID} src={logo} alt="Logo" />
        <img className={style.logoName} src={cue} alt="Cue" />
        <button className={style.closeButton} onClick={handleClose}>
          Close
        </button>
      </div>
      <div className={style.popupBody}>
        <h1 className={style.title}>Welcome to CUE!</h1>
        <p className={style.text}>
            To get started within CUE, make sure to check out our stories page where you could find stories
        </p>
      </div>
    </div>
  );
}
