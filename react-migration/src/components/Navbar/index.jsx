import "./index.css"
import logo from "../../images/logo.png"
import cue from "../../images/cue.png"
import more from "../../images/more.png"
import reject from "../../images/reject.png"
import NavbarButton from "../NavbarButton/index"
import React from 'react';
import { useState } from "react"
import { Link } from "react-router-dom";



const btnInfo = [
    { cn: "nav-button", path: "/", label: "Home" },
    { cn: "nav-button", path: "/Achievements", label: "Achievements" },
    { cn: "nav-button", path: "/Camera", label: "Camera" },
    { cn: "nav-button", path: "/Scenarios", label: "Scenarios" },
    { cn: "nav-button", path: "/Stories", label: "Stories" },
    { cn: "nav-button", path: "/TypesOfEmotions", label: "Types of Emotion" },
]

export default function Navbar() {
    const [mobNavStyling, setMobNavStyling] = useState({ height: "0", padding: "0" })

    function handleClick(e) {
        if (mobNavStyling.height == "0") {
            e.target.src = reject
            setMobNavStyling({ height: "180px", padding: "10px 0" })
        } else {
            e.target.src = more
            setMobNavStyling({ height: "0", padding: "0" })
        }
    }

    return (
        <nav>
            <div className="upper-nav">
                <div className="logo-container">
                    <Link to="/">
                        <img className="logo-image" src={logo} alt="logo" />
                    </Link>
                    <Link to="/">
                        <img className="logo-title" src={cue} alt="" />
                    </Link>
                </div>
                <div className="account-login-signup">
                    <button id="signup-nav">Sign up</button>
                    <button id="login-nav">Log in</button>
                </div>
                <img id="hamburger-menu" className="hamburger-menu" src={more} onClick={handleClick} />
            </div>
            <div className="lower-nav">
                {btnInfo.map((info) => <NavbarButton cn={info.cn} path={info.path} label={info.label} />)}
            </div>
            <div id="mobile-navbar" className="mobile-nav" style={mobNavStyling}>
                {btnInfo.map((info) => <NavbarButton cn={"mobile-" + info.cn} path={info.path} label={info.label} />)}
            </div>
        </nav>
    )
}
