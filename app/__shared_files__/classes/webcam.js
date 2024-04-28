// Copyright 2023 The MediaPipe Authors.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Additional note from Anthony, one of the research interns:
// The software was originally a single Javascript file which I then changed
// into a class for several uses as well as easier modifications incase any
// situation requires it.

// To import, use -- import cam from "/app/__shared_files__/classes/webcam.js"; --

import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

export default class cam {
    constructor() {
        this.faceLandmarker = null;
        this.runningMode = "IMAGE";
        this.video = document.getElementById("webcam");
        this.canvasElement = document.getElementById("output_canvas");
        this.canvasCtx = this.canvasElement.getContext("2d");
        this.enableWebcamButton = document.getElementById("webcamButton");;
        this.webcamRunning = false;
        this.videoWidth = 480;

        this.lastVideoTime = -1;
        this.results = undefined;
        this.drawingUtils = new DrawingUtils(this.canvasCtx);

        // Before anything, we need to ensure the webcam dynamic HTML loads in
        this.checkDynamicHTML();
        // Detects whether a camera is available or not
        this.hasCamera();
    }

    checkDynamicHTML() {
        if (this.enableWebcamButton == null) {
            throw new Error("There is no button to activate the webcam");
        }
        if (this.video == null) {
            throw new Error("There is no element: \"webcam\"");
        }
        if (this.canvasElement == null) {
            throw new Error("There is no element: \"output_canvas\"");
        }
        if (this.canvasCtx == null) {
            throw new Error("There is no element: \"2d\"");
        }
    }

    /********************************************************************
        Continuously grab image from webcam stream and detect it.
    ********************************************************************/

    hasCamera() {
        // Checks if webcam access is supported.
        function hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
        // If webcam supported, add event listener to button for when user wants to activate it.
        if (hasGetUserMedia()) {
            // Use arrow function to preserve 'this' context
            this.enableWebcamButton.addEventListener("click", () => this.setUpProcess());
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
    }

    async setUpProcess() {
        await this.createFaceLandmarker();
        this.enableCamera();
    }

    enableCamera() {
        if (!this.faceLandmarker) {
            console.log("Wait! faceLandmarker not loaded yet.");
            return;
        }
        if (this.webcamRunning === true) {
            this.webcamRunning = false;
            this.enableWebcamButton.innerText = "ENABLE PREDICTIONS";
        }
        else {
            this.webcamRunning = true;
            this.enableWebcamButton.innerText = "DISABLE PREDICTIONS";
        }
        // getUsermedia parameters.
        const constraints = {
            video: true
        };
        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            this.video.srcObject = stream;
            // Ensure 'this' refers to the class instance
            this.video.addEventListener("loadeddata", this.predictWebcam.bind(this));
        });
    }

    async createFaceLandmarker() {
        const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
        this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
            baseOptions: {
                modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                delegate: "GPU"
            },
            outputFaceBlendshapes: true,
            runningMode: this.runningMode,
            numFaces: 1
        });
    }

    async predictWebcam() {
        const radio = this.video.videoHeight / this.video.videoWidth;
        this.video.style.width = this.videoWidth + "px";
        this.video.style.height = this.videoWidth * radio + "px";
        this.canvasElement.style.width = this.videoWidth + "px";
        this.canvasElement.style.height = this.videoWidth * radio + "px";
        this.canvasElement.width = this.video.videoWidth;
        this.canvasElement.height = this.video.videoHeight;
        // Now let's start detecting the stream.
        if (this.runningMode === "IMAGE") {
            this.runningMode = "VIDEO";
            await this.faceLandmarker.setOptions({ runningMode: this.runningMode });
        }
        let startTimeMs = performance.now();
        if (this.lastVideoTime !== this.video.currentTime) {
            this.lastVideoTime = this.video.currentTime;
            this.results = this.faceLandmarker.detectForVideo(this.video, startTimeMs);
        }
        if (this.results.faceLandmarks) {
            for (const landmarks of this.results.faceLandmarks) {
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C070", lineWidth: 1 });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#FF3030" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, { color: "#FF3030" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#30FF30" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, { color: "#30FF30" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#E0E0E0" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, { color: "#E0E0E0" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, { color: "#FF3030" });
                this.drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, { color: "#30FF30" });
            }
        }
        /*
            faceBlendshapes is the object literal that stores the facial values
            results.faceBlendshapes
        */

        // Call this function again to keep predicting when the browser is ready.
        if (this.webcamRunning === true) {
            window.requestAnimationFrame(this.predictWebcam.bind(this));
        }
    }
}