import React, { useState } from "react";

import style from "./index.module.css";
import HomeRoundCarousel from "../../components/HomeRoundCarousel";
import HomeProgress from "../../components/HomeProgress";
import HomeCarousel from "../../components/HomeCarousel";

export default function HomePage() {
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const progressBar = {

  }
  const progressModes = {
    mode: currentEmotion,
    containers: [
      { completion: 10, background: "ek" },
      { completion: 10, background: "ek" },
      { completion: 10, background: "ek" },
    ],
  };

  return (
    <div className={style.mainContent}>
      <div className={style.bodyContent}>
        <div className={style.progressBar}>
          <HomeProgress />
        </div>
        <div className={style.centerContent}>
          <div className={style.progressModes}>
            {progressModes.containers.map((container, index) => {

            })}
            <div className={style.slideCarousel}>
              <HomeCarousel />
            </div>
          </div>
        </div>
      </div>
      <footer className={style.footerContainer}>
        <div className={style.bottomNav}></div>
        <div className={style.roundCarousel}>
          <HomeRoundCarousel />
        </div>
      </footer>
    </div>
  );
}
