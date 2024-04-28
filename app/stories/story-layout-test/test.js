import cam from "/app/__shared_files__/classes/webcam.js";

const reactionButton = document.getElementById("webcam");

const obj = new cam;

function test (){
    console.log("Test here");
}

reactionButton.addEventListener("click", test);