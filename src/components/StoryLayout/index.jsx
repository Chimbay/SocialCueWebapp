import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import Webcam from "../Webcam";
import style from "./index.module.css";
import image1 from "./images/introduction.png";
import image2 from "./images/page1.png";
import image3 from "./images/page2.png";
import image4 from "./images/conclusion.png";

import leftArrow from "./images/arrowLeft.png";
import rightArrow from "./images/arrowRight.png";

const pathFetch = [
  {
    storyID: "story00",
    pages: [
      { page: "1", imgSrc: image1 },
      {
        page: "2",
        imgSrc: image2,

        emotion: "happy",
        text: "One crisp autumn day, Sammy stumbled upon a clearing filled with golden sunlight filtering through the leaves. The sight of his favorite acorn tree, heavy with ripe acorns, filled Sammy's heart with pure happiness. What expression would Sammy wear as he discovers this bounty of acorns?",
      },
      {
        page: "3",
        imgSrc: image3,

        emotion: "surprised",
        text: "While exploring a hidden nook in the forest, Sammy heard a faint humming sound. Curious, he followed the melody until he stumbled upon a family of fireflies, lighting up the evening with their gentle glow. How would Sammy react to discovering this magical gathering of fireflies?",
      },
      {
        page: "4",
        imgSrc: image4,

        text: "As the sun dipped below the horizon, Sammy perched on his favorite branch, overlooking the peaceful forest. It had been a day of unexpected delights and newfound friends.",
      },
    ],
  },
];

export default function StoryLayout() {
  const [story, setStory] = useState(null);

  const [currentPageNumber, setCurrentPageNumber] = useState(null);
  const [currentPageImg, setCurrentPageImg] = useState(null);

  const [currentPageText, setCurrentPageText] = useState(null);
  const [currentPageEmotion, setCurrentPageEmotion] = useState(null);

  const [webcamActive, setWebcamActive] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);

  const { pathID } = useParams();

  let timer;

  // Fetch the story
  useEffect(() => {
    const dir = pathFetch.find((dir) => dir.storyID === pathID);

    console.log("hello");
    if (dir) {
      setStory(dir);
      setCurrentPageNumber(0);
      timer = 3000;
    }
  }, []);

  // Fetch the pages within the story and the emotion
  useEffect(() => {
    if (story && currentPageNumber !== null) {
      fetchPageInfo();
    }
  }, [currentPageNumber, story]);

  // Checks the answer
  const checkAnswer = (emotion) => {
    emotion == currentPageEmotion ? isCorrect() : isIncorrect();
    setAnswered(true);
  };

  function fetchPageInfo() {
    const pages = story.pages;
    const currentPage = pages[currentPageNumber];

    if (currentPage.emotion != null) {
      const currentPageEmotion = currentPage.emotion;
      setCurrentPageEmotion(currentPageEmotion);
    } else {
      setCurrentPageEmotion(null);
    }

    if (currentPage.text != null) {
      const currentPageText = currentPage.text;
      setCurrentPageText(currentPageText);
    } else {
      setCurrentPageText(null);
    }

    if (currentPage.imgSrc != null) {
      const currentPageImg = currentPage.imgSrc;
      console.log(currentPageImg);
      setCurrentPageImg(currentPageImg);
    } else {
      setCurrentPageImg(null);
    }
  }

  function isCorrect() {
    setAnsweredCorrectly((answer) => (answer = true));
    webcamTimer();

    // Time after you got the right answer
    setTimeout(async () => {
      setAnswered(false);
      flipPageOver();
    }, 3000);
  }
  function isIncorrect() {
    setAnsweredCorrectly((answer) => (answer = false));
    webcamTimer();
  }
  function checkRightPageBound() {
    return currentPageNumber < story.pages.length - 1;
  }
  function checkLeftPageBound() {
    return currentPageNumber > 0;
  }
  function flipPageOver() {
    if (checkRightPageBound())
      setCurrentPageNumber((number) => (number = number + 1));
  }
  function flipPageBack() {
    if (checkLeftPageBound())
      setCurrentPageNumber((number) => (number = number - 1));
  }
  function webcamTimer() {
    setTimeout(async () => {
      setWebcamActive(false);
    }, timer);
  }
  function ShowCaseAnswer() {
    let text;
    if (answeredCorrectly) {
      text = "Correct! You identified the emotion as " + currentPageEmotion;
    } else {
      text = "Incorrect. Try again!";
    }
    return <h2 className={style.emotionAnswer}>{text}</h2>;
  }

  return (
    <>
      <div className={style.storyScenery}>
        {currentPageImg && (
          <img
            className={style.storyImage}
            src={currentPageImg}
            alt="breh"
          ></img>
        )}
        {currentPageText && (
          <p className={style.storyText}>
            {currentPageText}{" "}
            {currentPageEmotion && (
              <button
                className={style.webcamButton}
                id={style.webcamButton}
                onClick={() => {
                  setWebcamActive(true);
                }}
              >
                Camera
              </button>
            )}
          </p>
        )}
        {/* Components */}
        {webcamActive && (
          <div className={style.webcamContainer}>
            <Webcam emotionDetection={checkAnswer} />
          </div>
        )}
        {answered && <ShowCaseAnswer />}
        <div className={style.buttonContainer}>
          <button
            className={style.backButton}
            id={style.pagebutton}
            onClick={flipPageBack}
          >
            <img className={style.buttonImage} src={leftArrow} />
          </button>
          <button
            className={style.forwardButton}
            id={style.pagebutton}
            onClick={flipPageOver}
          >
            <img className={style.buttonImage} src={rightArrow} />
          </button>
        </div>
      </div>

      <div className={style.storyDescription}>
        <div className={style.storyDetails}>
          <h3 className={style.storyTitle}>Story Title</h3>
          <div className={style.storyInfo}>
            <div className={style.storyAuthor}>
              <span className={style.label}>Author:</span>
              <span className={style.namee}>Anthony Chimbay</span>
            </div>
            <div className={style.ageRating}>
              <span className={style.label}>Age-rating:</span>
              <span className={style.name}>6+</span>
            </div>
            <div className={style.storyReadTime}>
              <span className={style.label}>Read time:</span>
              <span className={style.name}>3+ mins</span>
            </div>
          </div>
        </div>

        <div className={style.emotionDetails}>
          <h3 className={style.storyTitle}>Emotions focused on</h3>
          <div className={style.emotionList}>
            <span className={style.emotionPresent}>Happiness</span>
            <span className={style.emotionPresent}>Excitement</span>
          </div>
        </div>

        <div className={style.storySummary}>
          <h3 className={style.storyTitle}>Description</h3>
          <p className={style.description}>
            This charming tale follows Sammy through a day of small but magical
            discoveries in the forest. From the golden glow of his beloved acorn
            tree, brimming with ripe treasures, to the gentle wonder of a hidden
            firefly gathering, Sammy’s journey captures the joy of curiosity and
            the beauty of nature’s surprises. With each moment, his heart fills
            with delight—whether in awe at abundance or enchanted by the glow of
            newfound friends. As twilight settles, Sammy rests on his favorite
            branch, reflecting on a day touched by wonder, peace, and the quiet
            magic of the forest.
          </p>
        </div>
      </div>
    </>
  );
}
