import "./index.css"
import logo from "../../images/logo.png"
import cue from "../../images/cue.png"
import more from "../../images/more.png"
import reject from "../../images/reject.png"
import NavbarButton from "../NavbarButton/index"
import { useState } from "react"

const btnInfo = [
    { cn: "nav-button", link: "/", label: "Home" },
    { cn: "nav-button", link: "/", label: "Achievements" },
    { cn: "nav-button", link: "/", label: "Camera" },
    { cn: "nav-button", link: "/", label: "Scenarios" },
    { cn: "nav-button", link: "/", label: "Stories" },
    { cn: "nav-button", link: "/", label: "Types of Emotion" },
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
                    <a href="/index.html">
                        <img className="logo-image" src={logo} alt="logo" />
                    </a>
                    <a href="/index.html">
                        <img className="logo-title" src={cue} alt="" />
                    </a>
                </div>
                <div className="account-login-signup">
                    <button id="signup-nav">Sign up</button>
                    <button id="login-nav">Log in</button>
                </div>
                <img id="hamburger-menu" className="hamburger-menu" src={more} onClick={handleClick} />
            </div>
            <div className="lower-nav">
                {btnInfo.map((info) => <NavbarButton cn={info.cn} link={info.link} label={info.label} />)}
            </div>
            <div id="mobile-navbar" className="mobile-nav" style={mobNavStyling}>
                {btnInfo.map((info) => <NavbarButton cn={"mobile-" + info.cn} link={info.link} label={info.label} />)}
            </div>
        </nav>
    )
}
