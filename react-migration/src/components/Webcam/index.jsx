import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import style from "./index.module.css";

export default function Webcam({ emotionDetection }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      ]);
      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            setupVideo();
          });
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  };

  const setupVideo = () => {
    let currentEmotion;
    let isWebcamRunning = true;

    const runIntervals = async () => {
      if (!isWebcamRunning) return;
      currentEmotion = await handleDetection();
      setEmotion(currentEmotion);

      if (isWebcamRunning == true) {
        requestAnimationFrame(runIntervals);
      }
    };
    runIntervals();

    setTimeout(async () => {
      isWebcamRunning = false
      emotionDetection(currentEmotion);
    }, 3000);
  };

  const handleDetection = async () => {
    const video = videoRef.current;
    let emotion = null;

    const detectionWithExpressions = await faceapi
      .detectSingleFace(video, new faceapi.SsdMobilenetv1Options())
      .withFaceExpressions();

    if (detectionWithExpressions !== undefined) {
      const emotionArr = detectionWithExpressions.expressions;
      // handleDrawing(detectionWithExpressions);
      emotion = Object.keys(emotionArr).reduce((a, b) =>
        emotionArr[a] > emotionArr[b] ? a : b
      );
    }
    return emotion;
  };

  const handleDrawing = (detectionWithExpressions) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.width;
    canvas.height = video.height;

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    const resizedDetections = faceapi.resizeResults(
      detectionWithExpressions,
      displaySize
    );
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  };

  return (
    <div className={style.webcamContainer}>
      <div className={style.videoSection}>
        <video
          className={style.outputVideo}
          id={style.outputVideo}
          ref={videoRef}
          width="720"
          height="560"
          autoPlay
          muted
        ></video>
        <canvas
          ref={canvasRef}
          className={style.outputCanvas}
          id={style.outputCanvas}
          width="720"
          height="560"
        ></canvas>
      </div>
      <p>Current emotion: {emotion}</p>
    </div>
  );
}
