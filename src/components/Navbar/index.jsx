import style from "./index.module.css";
import logo from "../../images/logo.png";
import cue from "../../images/cue.png";
import more from "../../images/more.png";
import reject from "../../images/reject.png";
import NavbarButton from "../NavbarButton/index";
import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const btnInfo = [
  { cn: "navButton", path: "/", label: "Home" },
  { cn: "navButton", path: "/Achievements", label: "Achievements" },
  { cn: "navButton", path: "/Camera", label: "Camera" },
  { cn: "navButton", path: "/Scenarios", label: "Scenarios" },
  { cn: "navButton", path: "/Stories", label: "Stories" },
  { cn: "navButton", path: "/TypesOfEmotions", label: "Types of Emotion" },
];

export default function Navbar() {
  
  const [mobNavStyling, setMobNavStyling] = useState({
    height: "0",
    padding: "0",
  });
  const location = useLocation();

  function handleClick(e) {
    if (mobNavStyling.height == "0") {
      e.target.src = reject;
      setMobNavStyling({ height: "180px", padding: "10px 0" });
    } else {
      e.target.src = more;
      setMobNavStyling({ height: "0", padding: "0" });
    }
  }

  // Doesn't render on homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav>
      <div className={style.upperNav}>
        <div className={style.logoContainer}>
          <Link to="/">
            <img className={style.logoImage} src={logo} alt="logo" />
          </Link>
          <Link to="/">
            <img className={style.logoTitle} src={cue} alt="" />
          </Link>
        </div>
        <div className={style.accountLoginSignup}>
          <button id={style.signupNav}>Sign up</button>
          <button id={style.loginNav}>Log in</button>
        </div>
        <img
          id={style.hamburgerMenu}
          className={style.hamburgerMenu}
          src={more}
          onClick={handleClick}
        />
      </div>
      <div className={style.lowerNav}>
        {btnInfo.map((info, index) => (
          <NavbarButton
            cn={style[info.cn]}
            path={info.path}
            label={info.label}
            key={index}
          />
        ))}
      </div>
      <div
        id={style.mobileNavbar}
        className={style.mobileNav}
        style={mobNavStyling}
      >
        {btnInfo.map((info, index) => (
          <NavbarButton
            cn={"mobile-" + style[info.cn]}
            path={info.path}
            label={info.label}
            key={index}
          />
        ))}
      </div>
    </nav>
  );
}
