import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./index.module.css";

export default function GenreCarousel({ objectArr }) {
  // State variables
  const [slideIndex, setSlideIndex] = useState(0);
  const [widthStyle, setWidthStyle] = useState(null);
  const [basket, setBasket] = useState(null);
  const [findGap, setFindGap] = useState(null);

  // Refs for DOM elements and calculations
  const imageElemRef = useRef(null);
  const genreStoriesElemRef = useRef(null);
  const amountOfSlides = useRef(null);
  const amountOfStoryInSlide = useRef(null);
  const genreWidthRef = useRef(0);
  const storyWidthRef = useRef(0);
  const storyChildrenCountRef = useRef(0);

  // Effect to calculate initial values based on DOM elements
  useEffect(() => {
    if (genreStoriesElemRef.current) {
      genreWidthRef.current = genreStoriesElemRef.current.offsetWidth;
      storyWidthRef.current = imageElemRef.current.offsetWidth;
      storyChildrenCountRef.current =
        genreStoriesElemRef.current.children.length;
      amountOfSlides.current = calculateSlideCount();
      amountOfStoryInSlide.current = calculateGenreCount();
    }
  }, [genreStoriesElemRef]);

  // Effect to adjust width style when genre width changes
  useEffect(() => {
    if (genreWidthRef.current) {
      setWidthStyle(calculateGenreWidth());
      setBasket(calculateStoryArray());
      setFindGap(aquireGap());
    }
  }, [genreWidthRef]);

  // Helper functions
  function calculateSlideCount() {
    return Math.ceil(
      storyChildrenCountRef.current /
        (genreWidthRef.current / storyWidthRef.current)
    );
  }
  function calculateGenreCount() {
    return genreWidthRef.current / storyWidthRef.current;
  }
  function calculateStoryArray() {
    const childrenCount = storyChildrenCountRef.current;
    const slidesCount = amountOfSlides.current;
    const amountInSlide = amountOfStoryInSlide.current;
    console.log(amountInSlide);

    let arr = [];
    let tempArr = [];
    for (let i = 0; i < childrenCount; i++) {
      tempArr.push(i);

      if (tempArr.length === amountInSlide) {
        arr.push(tempArr);
        tempArr = [];
      }
    }
    if (tempArr.length > 0) {
      arr.push(tempArr);
    }

    console.log(arr);
    return arr;
  }
  function calculateGenreWidth() {
    const gapStyle = window.getComputedStyle(genreStoriesElemRef.current);
    const imageWidthStyle = window.getComputedStyle(imageElemRef.current);
    let imageWidth = imageWidthStyle.width;
    let gap = gapStyle.gap;
    gap = parseInt(gap, 10);
    imageWidth = parseInt(imageWidth, 10);
    return genreWidthRef.current + gap * ( amountOfStoryInSlide.current - 1);
  }
  function aquireGap() {
    const gapStyle = window.getComputedStyle(genreStoriesElemRef.current);
    let gap = gapStyle.gap;
    gap = parseInt(gap, 10);
    return gap;
  }

  // Navigation functions
  function previous() {
    const count = amountOfSlides.current;
    setSlideIndex((prevIndex) => (prevIndex === 0 ? count - 1 : prevIndex - 1));
  }
  function forward() {
    const count = amountOfSlides.current;
    setSlideIndex((prevIndex) => (prevIndex === count - 1 ? 0 : prevIndex + 1));
  }
  return (
    <div className={style["genre"]}>
      <Link className={style["genre-title"]} to={objectArr.genrePath}>
        <h2>Genre</h2>
      </Link>
      <div className={style["genre-inner"]}>
        <button className={style["previous-button"]} onClick={previous}>
          previous
        </button>
        <div
          className={style["genre-stories"]}
          ref={genreStoriesElemRef}
          style={{
            width: `${widthStyle}px`,
          }}
        >
          {objectArr.stories.map((story, storyIndex) => (
            <div
              id={basket?.[slideIndex]?.includes(storyIndex) ? "in" : "out"}
              key={storyIndex}
              className={style["story"]}
              style={{
                translate: `${
                  -100 * amountOfStoryInSlide.current * slideIndex
                }%`,
                ...(basket?.[slideIndex]?.includes(storyIndex)
                  ? {}
                  : {
                      marginLeft: `${-findGap}px`
                    }),
              }}
            >
              <Link className={style["story-link"]} to={story.storyPath}>
                <img
                  className={style["story-image"]}
                  ref={imageElemRef}
                  src={story.storyImage}
                ></img>
              </Link>
            </div>
          ))}
        </div>
        <button className={style["forward-button"]} onClick={forward}>
          forward
        </button>
      </div>
    </div>
  );
}
