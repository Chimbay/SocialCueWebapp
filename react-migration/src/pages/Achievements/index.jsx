import React from "react"
import "./index.css"

const achievementsList = ["Achievement", "Achievement", "Achievement", "Achievement", "Achievement", "Achievement",]

export default function Achievements() {
    return (
        <div className="achievement-container">
            {achievementsList.map((achName, index) =>
                <div className="achievement" key={`ach-list-${achName}-${index}`}>
                    {achName}
                </div>)}
        </div>
    )
}
