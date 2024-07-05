import React from "react";
import style from "./index.module.css";

const achievementsList = [
  "Achievement",
  "Achievement",
  "Achievement",
  "Achievement",
  "Achievement",
  "Achievement",
];

export default function Achievements() {
  return (
    <div className={style.achievementContainer}>
      {achievementsList.map((achName, index) => (
        <div className={style.achievement} key={`achList${achName}${index}`}>
          {achName}
        </div>
      ))}
    </div>
  );
}
