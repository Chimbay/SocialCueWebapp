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
    into a class for several uses as well as easier modifications incase any
    situation requires it.

    To import, use -- import cam from "/app/__shared_files__/classes/webcam.js"; --
*/
import vision from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;

export default class cam {
    constructor() {
        // Properities
        this.video = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.enableWebcamButton = null;
        this.videoWidth = 480;
        this.parentElement = null;
        this.webcamPosition = null;
        // Webcam attributes
        this.faceLandmarker = null;
        this.runningMode = "VIDEO";
        this.webcamRunning = false;
        this.lastVideoTime = -1;
        this.results = undefined;
        this.drawingUtils = null;

        // Detects whether a camera is available or not and if not, the webcam object no longer continues.
        this.#hasCamera();
        // Throw any notifications if necessary
        this.#notify();
    }

    // Ensuring requirements are met
    #hasCamera() {
        // Checks if webcam access is supported.
        function hasGetUserMedia() {
            return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
        }
        // If webcam supported, add event listener to button for when user wants to activate it.
        if (!hasGetUserMedia()) {
            console.error("getUserMedia() is not supported by your browser");
        }
    }
    #notify() {
        if (this.enableWebcamButton == null) {
            console.warn("No button was assigned to the webcam.");
        }
    }
    // Assignments
    assignButton(element) {
        if (!element) {
            console.warn(element, "Is invalid");
            return;
        }

        const buttonElement = (typeof element === 'string') ? document.getElementById(element) : element;

        if (buttonElement instanceof HTMLElement && buttonElement.tagName === 'BUTTON') {
            buttonElement.addEventListener("click", this.setUpProcess.bind(this));
            this.enableWebcamButton = buttonElement;
        } else {
            console.warn(element, "Is invalid");
        }
    }
    assignCamPlacement(element) {
        if (!element || !(element instanceof HTMLElement)) {
            console.warn("Invalid element provided for camera placement:", element);
            return;
        }

        this.parentElement = element;

        // Get the size of the div the cam is going to be placed in
        const computedStyle = getComputedStyle(element);
        let elementHeight = element.clientHeight;
        let elementWidth = element.clientWidth;
        elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
        // Store the position of the cam relative to the div it's being stored in (For instance, top right)
        this.webcamPosition = {
            top: 0 + 'px',
            left: (elementWidth - this.videoWidth) + 'px'
        }
    }
    // Methods to build the camera
    async setUpProcess() {
        // Ensuring Prequisities, exits if an error is met
        if (this.#checkPrerequisites()) return;
        // Creates the dynamic HTML for the webcam
        this.#createDynamicHTML();
        // Before anything, we need to ensure the dynamic [HTML] webcam has loaded in correctly
        this.#checkDynamicHTML();
        // Loading in the machine learning takes a while, we need to wait for it.
        await this.#createFaceLandmarker();
        // Loads up the camera with the facial recognition
        this.#enableCamera();
    }
    #checkPrerequisites() {
        let anyError = false;
        if (this.parentElement == null) {
            console.error("There webcam has no element to append to");
            anyError = true;
        }
        return anyError
    }
    #createDynamicHTML() {
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
            The code below was provided by The MediaPipe Authors, which I then changed into a dyanmic HTML.
        */

        // Create a new <div> element
        const webcamHTML = document.createElement('div')
        webcamHTML.id = 'webcam-section';
        // Function to create dynamic HTML elements for the webcam
        function createElement() {
            // Create HTML elements for webcam
            webcamHTML.innerHTML = `
                <video id="webcam" autoplay playsinline></video>
                <canvas class="output_canvas" id="output_canvas"></canvas> 
            `;
            // Append CSS stylesheet
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = '/app/__shared_files__/shared_styling/webcam.css';
            document.head.appendChild(linkElement);
        }
        // Append webcam to parent
        this.parentElement.appendChild(webcamHTML);
        // Set the position of the webcam
        webcamHTML.style.top = this.webcamPosition.top;
        webcamHTML.style.left = this.webcamPosition.left;
        // Call createElement function and wait for it to complete
        createElement();
        // Assign pointers to proper HTML elements
        this.video = document.getElementById("webcam");
        this.canvasElement = document.getElementById("output_canvas");
        this.canvasCtx = this.canvasElement.getContext("2d");
        this.drawingUtils = new DrawingUtils(this.canvasCtx);
    }
    #checkDynamicHTML() {
        if (this.video == null) {
            throw new Error("There is no element: \"webcam\"");
        }
        if (this.canvasElement == null) {
            throw new Error("There is no element: \"output_canvas\"");
        }
        if (this.canvasCtx == null) {
            throw new Error("There is no element: \"2d\"");
        }
        if (this.enableWebcamButton == null) {
            throw new Error("There is no button to activate the webcam");
        }
        if (this.drawingUtils == null) {
            throw new Error("Improper loading of drawingUtils");
        }
    }

    /********************************************************************
        Continuously grab image from webcam stream and detect it.
    ********************************************************************/

    async #createFaceLandmarker() {
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

    #enableCamera() {
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
            this.video.addEventListener("loadeddata", this.#predictWebcam.bind(this));
        });
    }

    async #predictWebcam() {
        const radio = this.video.videoHeight / this.video.videoWidth;
        this.video.style.width = this.videoWidth + "px";
        this.video.style.height = this.videoWidth * radio + "px";
        this.canvasElement.style.width = this.videoWidth + "px";
        this.canvasElement.style.height = this.videoWidth * radio + "px";
        this.canvasElement.width = this.video.videoWidth;
        this.canvasElement.height = this.video.videoHeight;

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
            window.requestAnimationFrame(this.#predictWebcam.bind(this));
        }
    }
}