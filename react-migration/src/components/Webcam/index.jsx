import React, { useEffect, useRef, useState } from "react";
import './face-api.min.jsx';
import "./index.css";


export default function Webcam() {
  const videoRef = useRef(null); // Ref for the video element
  const canvasRef = useRef(null); // Ref for the canvas element
  const [emotionList, setEmotionList] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        console.log(faceapi),
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]);
      startVideo(); // Once models are loaded, start the video
    };

    loadModels(); // Call loadModels when component mounts
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true }) // Changed to mediaDevices API
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set stream as video source
          videoRef.current.addEventListener("loadedmetadata", () => {
            setupCanvas(); // Call setupCanvas once video metadata is loaded
          });
        }
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  };

  const setupCanvas = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.width;
      canvas.height = video.height;

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detectionWithExpressions = await faceapi
          .detectSingleFace(video, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceExpressions();
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        if (detectionWithExpressions != undefined) {
          const resizedDetections = faceapi.resizeResults(
            detectionWithExpressions,
            displaySize
          );
          setEmotionList(detectionWithExpressions.expressions);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }
      }, 100);
    }
  };

  return (
    <div className="container">
      <div className="video-section">
        <video
          id="video"
          ref={videoRef}
          width="720"
          height="560"
          autoPlay
          muted
        ></video>
        <canvas
          ref={canvasRef}
          className="output_canvas"
          id="output_canvas"
          width="720"
          height="560"
        ></canvas>
      </div>
      <div className="emotion-section">
        <span>
          {emotionList ? (
            Object.entries(emotionList).map(([emotion, value], index) => (
              <div className="emotion-item">
                <span class="span-emotion">{emotion} </span>
                <span
                  class="span-value"
                  style={{
                    display: "inline-block",
                    width: `calc(${value * 300}px)`,
                  }}
                  id={emotion}
                >
                  {value.toFixed(4)}
                </span>
              </div>
            ))
          ) : (
            <div>Loading emotions...</div>
          )}
        </span>
      </div>
    </div>
  );
}
