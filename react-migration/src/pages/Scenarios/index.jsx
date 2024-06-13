import React from "react";
import childrenPlayingTag from "../../images/children-playing-tag.jpg";
import "./index.css";

const scenarios = [
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["sad", "happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["sad", "happy"],
    desc: "This is the description",
  },
  {
    img: childrenPlayingTag,
    header: "This is the header!",
    emotes: ["sad", "happy"],
    desc: "This is the description",
  },
];

function ScenarioCard({ imgSrc, header, emotions, description }) {
  return (
    <div className="card">
      <img className="card-image" src={imgSrc} alt="" />
      <h2 className="scenario-header">{header}</h2>
      <div className="subheader">
        {emotions &&
          emotions.map((emotion, index) => (
            <button
              key={`scenario-emotion-${index}`}
              className="scenario-emotion"
            >
              {emotion}
            </button>
          ))}
        <p className="scenario-description">{description}</p>
      </div>
    </div>
  );
}

export default function Scenarios() {
  return (
    <>
      <h1>This is the Scenarios section!</h1>
      {scenarios.map((scenario, index) => (
        <ScenarioCard
          key={`scenario-card-${index}`}
          imgSrc={scenario.img}
          header={scenario.header}
          emotions={scenario.emotes}
          description={scenario.desc}
        />
      ))}
    </>
  );
}
