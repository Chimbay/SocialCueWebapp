import React, { useState } from "react";

import style from "./index.module.css";
import HomeRoundCarousel from "../../components/HomeRoundCarousel";

export default function HomePage() {
  const [currentEmotion, setCurrentEmotion] = useState(null);

  return (
    <div className={style.mainContent}>
      <footer className={style.footerContainer}>
        <div className={style.bottomNav}></div>
        <div className={style.carouselHolder}>
          <HomeRoundCarousel />
        </div>
      </footer>
    </div>
  );
}
