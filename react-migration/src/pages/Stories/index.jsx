import React from "react";
import GenreCarousel from "../../components/GenreCarousel";
import heroTag from "./hero.png";
import "./index.css";
import sixfour from "./600400.png";

export default function Stories() {

  const numGenres = 3;
  const numStories = 9;

  const genres = [];

  for (let i = 0; i < numGenres; i++) {
    const stories = [];
    for (let j = 0; j < numStories; j++) {
      stories.push({
        storyPath: `sad${i}${j}`,
        storyImage: sixfour,
        storyTitle: `asdsad${i}${j}`,
        storyDesc: `asdasdas${i}${j}`,
      });
    }
    genres.push({
      genrePath: `example${i}`,
      stories,
    });
  }

  return (
    <section className="main-body">
      <div className="introduction">
        <div className="introduction-image">
          <img src={heroTag}></img>
        </div>
        <h1 className="introduction-text">Let the stories wander your mind!</h1>
        <p className="introduction-text" id="introduction-text-description">
          Take a wild ride into the adventure of your favorite stories!
        </p>
      </div>

      <div className="story-section">
        <div className="genre-section">
          {genres.map((genre, index) => (
              <GenreCarousel objectArr={genre} key={index}/>
          ))}
        </div>
      </div>
    </section>
  );
}
