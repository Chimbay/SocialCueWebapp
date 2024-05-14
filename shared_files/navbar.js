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
            <a href="/SocialCueWebapp/index.html">
                <img class="logo-image" src="/SocialCueWebapp/shared_files/shared_images/logo.svg" alt="logo">
            </a>
            <a href="/SocialCueWebapp/index.html">
                <img class="logo-title" src="/SocialCueWebapp/shared_files/shared_images/cue.svg" alt="">
            </a>
        </div>
        <div class="account-login-signup">
            <button id="signup-nav">Sign up</button>
            <button id="login-nav">Log in</button>
        </div>
        <img id="hamburger-menu" class="hamburger-menu" src="/SocialCueWebapp/shared_files/shared_images/more.png">
    </div>
    <div class="lower-nav">
        <a class="nav-button" href="/SocialCueWebapp/index.html">Home</a>
        <a class="nav-button" href="/SocialCueWebapp/achievements/index.html">Achievements</a>
        <a class="nav-button" href="/SocialCueWebapp/camera/index.html">Camera</a>
        <a class="nav-button" href="/SocialCueWebapp/scenarios/index.html">Scenarios</a>
        <a class="nav-button" href="/SocialCueWebapp/stories/index.html">Stories</a>
        <a id="last-nav-button" class="nav-button" href="/SocialCueWebapp/type_of_emotion/index.html">Types of Emotion</a>
    </div>
    <div id="mobile-navbar" class="mobile-nav">
        <a class="mobile-nav-button" href="/SocialCueWebapp/index.html">Home</a>
        <a class="mobile-nav-button" href="/SocialCueWebapp/achievements/index.html">Achievements</a>
        <a class="mobile-nav-button" href="/SocialCueWebapp/camera/index.html">Camera</a>
        <a class="mobile-nav-button" href="/SocialCueWebapp/scenarios/index.html">Scenarios</a>
        <a class="mobile-nav-button" href="/SocialCueWebapp/stories/index.html">Stories</a>
        <a class="mobile-nav-button" href="/SocialCueWebapp/type_of_emotion/index.html">Types of Emotion</a>
    </div>
    `

document.head.innerHTML += `
    <link rel="stylesheet" href="/SocialCueWebapp/shared_files/shared_styling/navbar.css">
`

let isMobileNavOpen = false
const hamburgerMenu = document.getElementById("hamburger-menu")
const mobileNavbar = document.getElementById("mobile-navbar")

hamburgerMenu.addEventListener("click", () => {
    if (!isMobileNavOpen) {
        isMobileNavOpen = true
        mobileNavbar.style.height = "180px"
        mobileNavbar.style.padding = "10px 0"
        hamburgerMenu.src = "/SocialCueWebapp/shared_files/shared_images/reject.png"
    } else {
        isMobileNavOpen = false
        mobileNavbar.style.height = "0px"
        mobileNavbar.style.padding = "0px"
        hamburgerMenu.src = "/SocialCueWebapp/shared_files/shared_images/more.png"
    }
})
