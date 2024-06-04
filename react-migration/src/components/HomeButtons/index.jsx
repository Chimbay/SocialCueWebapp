import React from 'react'
import { Link } from "react-router-dom";

import './index.css'

export default function HomeButtons() {

    const btnInfo = [
        { cn: "achievement-button", path: "/", label: "Achievements" },
        { cn: "experiences-button", path: "/", label: "Camera" },
        { cn: "experiences-button", path: "/", label: "Stories" },
        { cn: "experiences-button", path: "/", label: "Scenarios" },
        { cn: "experiences-button", path: "/", label: "Type of Emotions" },
    ]

    return (
        <div class="experiences-button-container" id="button-container">
            {btnInfo.map((info) => <Link className={info.cn} to={info.path}>{info.label}</Link>)}
        </div>
    )
}