import { Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import GenreCarousel from '../../components/GenreCarousel';
import heroTag from './hero.png';
import sixfour from './autumn.png';
import style from './index.module.css';

export default function Stories() {
  const location = useLocation();
  const isRootPath = location.pathname === '/Stories';
  const numGenres = 1;
  const numStories = 1;

  const genres = [];

  for (let i = 0; i < numGenres; i++) {
    const stories = [];
    for (let j = 0; j < numStories; j++) {
      stories.push({
        storyPath: `story${i}${j}`,
        storyImage: sixfour,
        storyTitle: `story${i}${j}`,
        storyDesc: `story${i}${j}`,
      });
    }
    genres.push({
      genrePath: `example${i}`,
      stories,
    });
  }

  return (
    <section className={style.mainBody}>
      {isRootPath ? (
        <>
          <div className={style.introduction}>
            <div className={style.introductionImage}>
              <img src={heroTag} alt="Hero" />
            </div>
            <h1 className={style.introductionText}>
              Let the stories wander your mind!
            </h1>
            <p
              className={style.introductionText}
              id={style.introductionTextDescription}
            >
              Take a wild ride into the adventure of your favorite stories!
            </p>
          </div>

          <div className={style.storySection}>
            <div className={style.genreSection}>
              {genres.map((genre, index) => (
                <GenreCarousel objectArr={genre} key={index} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </section>
  );
}
