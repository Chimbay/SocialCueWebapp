import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import style from "./index.module.css";

export default function Webcam({ emotionDetection, triggerButton }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [emotion, setEmotion] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  // Load models once
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load models:", err);
      }
    };
    loadModels();
  }, []);

  // Start camera when models are loaded
  useEffect(() => {
    if (!modelsLoaded) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true);
            // Auto-start only if no trigger button provided
            if (triggerButton === undefined) {
              startEmotionCapture();
            }
          };
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, [modelsLoaded]);

  // Listen for trigger button clicks
  useEffect(() => {
    const buttonElement = triggerButton?.current;
    if (!buttonElement || !cameraReady) return;

    const handleClick = () => {
      if (!isDetecting) {
        startEmotionCapture();
      }
    };

    buttonElement.addEventListener("click", handleClick);
    return () => buttonElement.removeEventListener("click", handleClick);
  }, [triggerButton, cameraReady, isDetecting]);

  const startEmotionCapture = () => {
    setIsDetecting(true);
    setCountdown(3);
    let finalEmotion = null;

    // Countdown
    let count = 3;
    const countdownTimer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownTimer);
        setCountdown(null);
      }
    }, 1000);

    // Detection loop
    const detectEmotion = async () => {
      if (!videoRef.current) return;

      try {
        const detection = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.SsdMobilenetv1Options(),
          )
          .withFaceExpressions();

        if (detection) {
          const expressions = detection.expressions;
          finalEmotion = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b,
          );
          setEmotion(finalEmotion);
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    };

    // Run detection continuously for 3 seconds
    const detectionInterval = setInterval(detectEmotion, 100);

    // Stop after 3 seconds
    setTimeout(() => {
      clearInterval(detectionInterval);
      setIsDetecting(false);
      if (emotionDetection && finalEmotion) {
        emotionDetection(finalEmotion);
      }
    }, 3000);
  };

  if (!modelsLoaded) {
    return <div>Loading face detection models...</div>;
  }

  return (
    <div className={style.webcamContainer}>
      <div className={style.videoSection} style={{ position: "relative" }}>
        <video
          ref={videoRef}
          className={style.outputVideo}
          id={style.outputVideo}
          width="720"
          height="560"
          autoPlay
          muted
        />
        <canvas
          ref={canvasRef}
          className={style.outputCanvas}
          id={style.outputCanvas}
          width="720"
          height="560"
        />

        {countdown !== null && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#007bff",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                fontWeight: "bold",
                border: "3px solid white",
              }}
            >
              {countdown > 0 ? countdown : "Go!"}
            </div>
          </div>
        )}
      </div>

      <p>Current emotion: {emotion || "None detected"}</p>

      {/* Show test button only if no trigger button provided
      {triggerButton === undefined && cameraReady && (
        <button onClick={startEmotionCapture} style={{ padding: '10px', marginTop: '10px' }}>
          Start Detection
        </button>
      )}*/}
    </div>
  );
}
