import React, { useEffect, useState } from "react";

import style from "./index.module.css";
import { Link, Outlet, useParams } from "react-router-dom";

export default function Playground() {
  const { groundPathID } = useParams();

  const explore = [
    {
      category: "happy",
      items: {
        explorer: {
          pages: [
            {
              title: "What is happiness?",
              text: "Happiness is like a special kind of magic that makes your heart feel warm and your face light up with a big smile. Imagine you just discovered a secret garden full of beautiful flowers or your favorite superhero gave you a high-five. That amazing, tingly feeling you get inside is called happiness.",
            },
            {
              // Add more page objects as needed
            },
          ],
        },
        test: [
          // Add test items here
        ],
      },
    },
  ];

  const [emotionMode, setEmotionMode] = useState(null);
  const [title, setTitle] = useState(null);

  // Fetch the explorer
  useEffect(() => {
    console.log(groundPathID);
    const mode = explore.find((dir) => dir.category === groundPathID);
    if (mode) {
      setEmotionMode(mode);
      setTitle(mode.title);
    } else {
      console.error("Explorer with learnID '01' not found.");
    }
  }, []);

  return (
    <div className={style.mainContent}>
      {emotionMode ? (
        <>
          <div className={style.playGroundNav}>
            <Link to="/">
              <button className={style.returnHomeButton}></button>
            </Link>
            <div className={style.bar}>
              <h1 className={style.barTitle}>{title}</h1>
              <div className={style.dropDown}>
                <h2 className={style.barTitle}>This</h2>
                <div className={style.completionBar}>
                  <div className={style.completionProgress}></div>
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </>
      ) : null}
    </div>
  );
}
