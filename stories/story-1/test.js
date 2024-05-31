import cam from "/shared_files/classes/webcam.js";
import EmotionProfiles from "/shared_files/classes/emotionProfile.js";

const reactionButton = document.getElementById("webcamButton");
const childElement = document.querySelector('.story-scenery');
const obj = new cam;
obj.setButton(reactionButton);
obj.setCamPlacement(childElement);
const profiles = new EmotionProfiles;

// Get the target element
var divElement = document.querySelector(".story-scenery");


reactionButton.addEventListener("click", function() {
    setTimeout(function () {
        var features = obj.getResults();
        const emotionList = {};
        // Iterate over emotion profiles
        for (const [profile, obj] of Object.entries(features)) {
            // Iterate over features and calculate weighted sum
            for (const [index, insideIndex] of Object.entries(obj)) {
                emotionList[insideIndex.categoryName] = insideIndex.score;
            }
        }
        console.log(emotionList);
        profiles.setFeatureValues(emotionList);
        var emotion = profiles.predictEmotions();
        console.log(emotion);
        if(emotion == 'happiness'){
            var status = document.createElement('p');
            status.id = 'answer';
            status.textContent = "Thats correct: Happiness";
            // Set the CSS styles
            status.style.position = "absolute";
            status.style.fontSize = '45px';
    
            var img = document.querySelector('.story-image');
            img.style.colorbackground = 'black';
    
            divElement.appendChild(status);
            
        }
    }, 6000);
});

// var focusedTimer;
// var fadeElement;
// function handleScroll() {
//     // Get the position of the div relative to the viewport
//     var rect = divElement.getBoundingClientRect();
//     // Check if the div is within a certain range of the viewport
//     if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
//         console.log("User is focused.")
//         if (!focusedTimer) {
//             focusedTimer = setTimeout(function () {
//                 // Calculate the view of the scenery relative to your screen
//                 const computedStyle = getComputedStyle(divElement);
//                 let elementHeight = divElement.clientHeight;
//                 elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
//                 var rect = divElement.getBoundingClientRect();
//                 var viewportHeight = rect.top + window.scrollY - divElement.ownerDocument.documentElement.clientTop - (window.innerHeight - elementHeight) / 2;
//                 console.log(rect.top);

//                 window.scrollTo({
//                     top: viewportHeight,
//                     behavior: 'smooth'
//                 });

//                 if (!fadeElement) {
//                     fadeElement = document.createElement('div');
//                     fadeElement.className = 'fade';
//                     document.body.appendChild(fadeElement);
//                     fadeElement.classList.add('in');
//                     divElement.style.zIndex = "2";
//                 }
//             }, 3000); // 5 seconds in milliseconds
//         }
//     } else {
//         console.log("User is not focused on the div.");
//         focusedTimer = null;
//         fadeElement.classList.add('out');
//         fadeElement = null;
//     }
// }

// // Add scroll event listener
// window.addEventListener("scroll", handleScroll);

