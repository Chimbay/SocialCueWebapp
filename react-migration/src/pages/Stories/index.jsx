import React from 'react'
import { Link } from "react-router-dom";

import './index.css'

export default function Stories() {

    const genres = [
        { path: "sad", image: "asd", title: "asdsad", desc: "asdasdas", },
        { path: "sad", image: "asd", title: "asdsad", desc: "asdasdas", },
        { path: "sad", image: "asd", title: "asdsad", desc: "asdasdas", },
        { path: "sad", image: "asd", title: "asdsad", desc: "asdasdas", },
        { path: "sad", image: "asd", title: "asdsad", desc: "asdasdas", },

    ]

    return (
        <section className="main-body">
            <div className="introduction">
                <div className="introduction-image">
                    <img src="images/hero-image.png"></img>
                </div>
                <h1 className="introduction-text">Let the stories wander your mind!</h1>
                <p className="introduction-text" id="introduction-text-description">
                    Take a wild ride into the adventure of your favorite stories!
                </p>
            </div>

            <div className="story-section">
                {genres.map((genre) =>
                    <div className="story-genre">
                        <Link to={genre.path}>
                            <img className="story-genre-image" src={genre.src}></img>
                            <div className="story-genre-title">{genre.title}</div>
                            <div className="story-genre-description">{genre.desc}</div>
                        </Link>
                    </div>

                )}
            </div>
        </section>
    )
}