import React, { useState, useRef } from "react";

import style from "./index.module.css";
import Webcam from "../../components/Webcam";

export default function Camera() {
  const [clicked, setClicked] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const buttonRef = useRef(null);

  return (
    <div className={style.mainContent}>
      <div className={style.webcamContainer}>
        <Webcam emotionDetection={emotion} triggerButton={buttonRef} />
      </div>
      <button
        ref={buttonRef}
        className={style.webcamButton}
        id={style.webcamButton}
        onClick={() => setClicked(!clicked)}
      >
        Start
      </button>
    </div>
  );
}
