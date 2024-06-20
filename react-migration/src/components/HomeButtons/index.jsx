import React from "react";
import { Link } from "react-router-dom";

import style from "./index.module.css";

export default function HomeButtons() {
  const btnInfo = [
    { cn: "achievementButton", path: "/", label: "Achievements" },
    { cn: "experiencesButton", path: "/", label: "Camera" },
    { cn: "experiencesButton", path: "/", label: "Stories" },
    { cn: "experiencesButton", path: "/", label: "Scenarios" },
    { cn: "experiencesButton", path: "/", label: "Type of Emotions" },
  ];

  return (
    <div
      className={style.experiencesButtonContainer}
      id={style.buttonContainer}
    >
      {btnInfo.map((info, index) => (
        <Link className={style[info.cn]} to={info.path} key={index}>
          {info.label}
        </Link>
      ))}
    </div>
  );
}
