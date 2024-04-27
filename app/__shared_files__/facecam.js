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
    The code below was provided by Apache which I then changed into a dyanmic HTML.
*/

/*
    To reuse the face cam , create the following element before the body tag:

    <div id="liveView" class="videoView"></div>

    The "ID" and the "CLASS" is the most important part, that is how the JS file will target the element
    Now add the following script before the closing html tag:

    <script src="[PATH-TO-THIS-FILE]"></script>

    If you do not care to use the relative path, the absolute path is:

    <script src="/app/__shared_files__/facecam.js"></script>
*/

const webcam = document.getElementById("liveView");
async function createElement() {
    webcam.innerHTML =
        `<button id="webcamButton" class="mdc-button mdc-button--raised">
            <span class="mdc-button__label">ENABLE WEBCAM</span>
        </button>

        <div style="position: relative;">
            <video id="webcam" style="position: abso" autoplay playsinline></video>
            <canvas class="output_canvas" id="output_canvas" style="position: absolute; left: 0px; top: 0px;"></canvas>
        </div>`

    document.head.innerHTML += `
    <link rel="stylesheet" href="/app/face_landmarker/webcam/facecam.css">`
}
createElement();