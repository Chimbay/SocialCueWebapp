import cam from "/app/__shared_files__/classes/webcam.js";

const reactionButton = document.getElementById("webcamButton");
const childElement = document.querySelector('.story-scenery');
const obj = new cam;
obj.assignButton(reactionButton);
obj.assignCamPlacement(childElement);