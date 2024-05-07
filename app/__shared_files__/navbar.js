/*
To reuse the navbar , create the following element before the body tag:

<navbar id="navbar">
</navbar>

The "ID" is the most important part, that is how the JS file will target the element
Now add the following script before the closing html tag:

<script src="[PATH-TO-THIS-FILE]"></script>
*/

const navbar = document.getElementById("navbar")
const head = document.getElementsByName("head")

navbar.innerHTML =
    `
    <div class="upper-nav">
        <div class="logo-container">
            <img class="logo-image" src="/app/__shared_files__/shared_images/logo.svg" alt="logo">
            <img class="logo-title" src="/app/__shared_files__/shared_images/cue.svg" alt="">
        </div>
        <div class="account-login-signup">
            <button id="signup-nav">Sign up</button>
            <button id="login-nav">Log in</button>
        </div>
        <img id="hamburger-menu" class="hamburger-menu" src="/app/__shared_files__/shared_images/more.png">
    </div>
    <div class="lower-nav">
        <a class="nav-button" href="/app/index.html">Home</a>
        <a class="nav-button" href="/app/achievements/index.html">Achievements</a>
        <a class="nav-button" href="/app/camera/index.html">Camera</a>
        <a class="nav-button" href="/app/scenarios/index.html">Scenarios</a>
        <a class="nav-button" href="/app/stories/index.html">Stories</a>
        <a id="last-nav-button" class="nav-button" href="/app/type_of_emotion/index.html">Types of Emotion</a>
    </div>`

document.head.innerHTML += `
    <link rel="stylesheet" href="/app/__shared_files__/shared_styling/navbar.css">
`
