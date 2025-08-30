import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmotionQuiz from "../EmotionQuiz";
import Webcam from "../Webcam";

export default function EmotionTest() {
  const { groundPathID } = useParams();
  const navigate = useNavigate();

  const [webcam, setWebcam] = useState(false); // Initialized as false

  const checkAnswer = (emotion) => {
    emotion === currentPageEmotion ? isCorrect() : isIncorrect(); // Strict comparison
    setAnswered(true);
  };

  return (
    <>
      <EmotionQuiz />
      <button onClick={() => setWebcam(true)}>
        Turn on for webcam
      </button>

      {webcam && <Webcam emotionDetection={checkAnswer} />}
    </>
  );
}