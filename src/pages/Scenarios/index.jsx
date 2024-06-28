import React, { useState } from "react";
import childrenPlayingTag from "../../images/children-playing-tag.jpg";
import style from "./index.module.css";

const scenarios = [
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["Sad", "Happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["Sad", "Happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["Sad", "Happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["Sad", "Happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["Sad", "Happy"],
    desc: "This is the description",
  },
];

function ScenarioCard({ imgSrc, header, emotions, description }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={style.scenarioCard}>
      {!isLoaded && <h1 className={style.loadingHeader}>Loading...</h1>}
      <img
        onLoad={() => setIsLoaded(true)}
        className={style.scenarioCardImage}
        src={imgSrc}
        alt=""
      />
      <h2 className={style.scenarioHeader}>{header}</h2>
      <div className={style.subSection}>
        <h3 className={style.subheader}>Emotions:</h3>
        {emotions &&
          emotions.map((emotion, index) => (
            <button
              key={`scenarioEmotion${index}`}
              className={style.scenarioEmotion}
            >
              {emotion}
            </button>
          ))}
        <p className={style.scenarioDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function Scenarios() {
  return (
    <>
      <h1>This is the Scenarios section!</h1>
      <div className={style.scenarioCardContainer}>
        {scenarios.map((scenario, index) => (
          <ScenarioCard
            key={`scenarioCard${index}`}
            imgSrc={scenario.img}
            header={scenario.header}
            emotions={scenario.emotes}
            description={scenario.desc}
          />
        ))}
      </div>
    </>
  );
}
