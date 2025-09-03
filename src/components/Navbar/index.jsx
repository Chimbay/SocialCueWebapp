import style from "./index.module.css";
import logo from "../../images/logo.png";
import cue from "../../images/cue.png";
import more from "../../images/more.png";
import reject from "../../images/reject.png";
import NavbarButton from "../NavbarButton/index";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  function handleClick(e) {
    if (mobNavStyling.height == "0") {
      e.target.src = reject;
      setMobNavStyling({ height: "180px", padding: "10px 0" });
    } else {
      e.target.src = more;
      setMobNavStyling({ height: "0", padding: "0" });
    }
  }

  return (
    <nav>
      <div className="flex justify-between m-auto bg-white py-2.5 px-5 max-lg:items-center">
        <div className="flex items-center">
          <Link to="/">
            <img className="max-md:w-17.5" src={logo} alt="logo" />
          </Link>
          <Link to="/">
            <img className="max-md:w-25" src={cue} alt="" />
          </Link>
        </div>
        <div className="flex items-center justify-between max-md:hidden">
          <button id={style.signupNav}>Sign up</button>
          <button id={style.loginNav}>Log in</button>
        </div>
        <img
          // className={style.hamburgerMenu}
          className="hidden w-7.5 h-7.5 max-md:flex max-md:cursor-pointer"
          src={more}
          onClick={handleClick}
        />
      </div>
      {/* <div className={style.lowerNav}>*/}
      <div className="hidden bg-white justify-center px-0 pb-2.5 md:flex lg:px-5 lg:pb-2.5 lg:justify-start">
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
        className="absolute w-screen h-0 bg-neutral-100 flex flex-col overflow-y-hidden z-50 transition-all duration-300"
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
