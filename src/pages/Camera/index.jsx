import React, { useState } from "react";

import style from "./index.module.css";

export default function Camera() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={style.mainContent}>
      <div className={style.leftSide}>
        <div className={style.webcam}></div>
        <button
          className={style.buttonWebcam}
          onClick={() => setClicked(!clicked)}
        ></button>
      </div>

      <div className={style.rightSide}></div>
    </div>
  );
}
