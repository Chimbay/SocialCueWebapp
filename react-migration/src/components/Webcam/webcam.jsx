/* 
    Copyright 2023 The MediaPipe Authors.
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

    Additional note from Anthony, one of the research interns:
    The software was originally a single Javascript file which I then changed
    into a react component for several uses as well as easier modifications incase any
    situation requires it.
*/

import React, { useEffect, useState, useRef } from 'react';
import { CreateFaceLandmarker } from './fetch-landmarker';
import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, DrawingUtils } = vision;
import './webcam.css'

const Webcam = ({blendValueProp}) => {
    // References
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const timeRef = useState(null);
    const resultsRef = useState(null);
    const drawingUtils = useRef(null);
    const containerHeightRef = useRef(null);
    // States
    const [faceLandMarker, setFaceLandmarker] = useState(null);
    const [blendText, setBlendText] = useState(null);
    // Boolean to check if the webcam is running
    let isWebcamRunning;

    // Checks whether the user has a camera
    function HasCamera() {
        function GetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }

        if (!GetUserMedia) {
            throw new Error("No camera");
        }
    }

    function setUpCanvasElements() {
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        drawingUtils.current = new DrawingUtils(canvasCtx);
    }

    // Starts up landmarker
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const checkConditions = async () => {
            try {
                HasCamera();
                const marker = await CreateFaceLandmarker(signal);
                setFaceLandmarker(marker);
                setUpCanvasElements();
            } catch (err) {
                console.log(err);
                setFaceLandmarker(null);
            }
        }
        checkConditions();

        return () => {
            controller.abort();
        }
    }, [])

    // Set up webcam
    useEffect(() => {
        const videoElement = videoRef.current;
        let isMounted = false;
        let stream = null;

        const loadedDataHandler = async () => {
            if (!isMounted) return;
            isWebcamRunning = true;
            await setRatio();
            predictWebcam();
        };

        const refreshStream = () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        }

        if (faceLandMarker != null) {
            const constraints = {
                video: true,
            };
            isMounted = true;

            navigator.mediaDevices.getUserMedia(constraints)
                .then((mediaStream) => {
                    stream = mediaStream;
                    videoElement.srcObject = mediaStream;
                    !isMounted ? refreshStream() : videoElement.addEventListener("loadeddata", loadedDataHandler);
                })
                .catch((err) => {

                }
                );
        }

        return () => {
            if (faceLandMarker != null) {
                isMounted = false;
                isWebcamRunning = false;
                refreshStream();
                videoElement.removeEventListener("loadeddata", loadedDataHandler);
            }
        };
    }, [faceLandMarker]);

    const setRatio = () => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const ratio = videoElement.videoHeight / videoElement.videoWidth;

        var videoWidth = document.getElementById('webcam');
        videoWidth = window.getComputedStyle(videoWidth);
        videoWidth = parseInt(videoWidth.getPropertyValue('width'), 10);

        videoElement.style.width = videoWidth + "px";
        videoElement.style.height = videoWidth * ratio + "px";
        canvasElement.style.width = videoWidth + "px";
        canvasElement.style.height = videoWidth * ratio + "px";
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        var container = document.getElementById('webcam-section');
        var elementWidth = videoElement.style.width;
        var elementHeight = videoElement.style.height;
        container.style.height = elementHeight;
        container.style.width = elementWidth;
    }

    // Starts detection
    const predictWebcam = () => {
        if (!isWebcamRunning) return;
        const startTimeMS = performance.now();
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const ctx = canvasElement.getContext('2d');
        const illustration = drawingUtils.current;

        if (timeRef.current !== videoElement.currentTime) {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            timeRef.current = videoElement.currentTime;
            resultsRef.current = faceLandMarker.detectForVideo(videoElement, startTimeMS);
        }

        if (resultsRef.current.faceLandmarks) {
            for (const landmarks of resultsRef.current.faceLandmarks) {
                illustration.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" });
            }
        }


        let blendValues = (resultsRef.current.faceBlendshapes) || [];
        blendValueProp(blendValues);

        if (isWebcamRunning == true) {
            requestAnimationFrame(predictWebcam);
        } else {
            // Nothing
        }
    }

    return (
        <div>
            <div ref={containerHeightRef} id='webcam-section'>
                <video ref={videoRef} id="webcam" autoPlay playsInline></video>
                <canvas ref={canvasRef} className="output_canvas" id="output_canvas"></canvas>
            </div>
        </div>
    );
}

export default Webcam;