import React from "react";
import style from "./index.module.css";

export default function HomeProgress() {
  return (
    <div className={style.mainContent}>
      <div className={style.container}>
        <h2 className={style.emotionTitle}>Emotion</h2>
        <div className={style.completionBar}>
          <div className={style.progress}>
            
          </div>
        </div>
      </div>
    </div>
  );
}
