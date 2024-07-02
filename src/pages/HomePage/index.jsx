import React, { useState } from "react";

import style from "./index.module.css";
import HomeRoundCarousel from "../../components/HomeRoundCarousel";
import HomeProgress from "../../components/HomeProgress";
import HomeCarousel from "../../components/HomeCarousel";

export default function HomePage() {
  const [currentEmotion, setCurrentEmotion] = useState(null);

  return (
    <div className={style.mainContent}>
      <div className={style.bodyContent}>
        <div className={style.progressSection}>
          <HomeProgress />
        </div>
        <div className={style.slideCarousel}>
          <HomeCarousel/>
        </div>

      </div>
      <footer className={style.footerContainer}>
        <div className={style.bottomNav}></div>
        <div className={style.carouselHolder}>
          <HomeRoundCarousel />
        </div>
      </footer>
    </div>
  );
}
