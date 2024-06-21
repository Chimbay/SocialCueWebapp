import React, { useState } from "react";
import { useParams } from 'react-router-dom';

import Webcam from '../../components/Webcam'

import style from "./index.module.css";

export default function StoryLayout() {
  const [emotionButton, setEmotionbutton] = useState(false);

  const { pathID } = useParams();

  return (
    <>
      <div className={style.storyScenery}>
        <img className={style.storyImage} src="story-page-1.jpg" alt="Story Page" />
        <p className={style.storyText}>
          <button id={style.webcamButton} onClick={() => {
            setEmotionbutton(!emotionButton)
          }} className={style.webcamButton}>Button</button>
        </p>
        {emotionButton && (
          <>
            <Webcam />
          </>
        )}
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
            "In a vibrant neighborhood, the Henderson family's home radiates
            with the laughter of Emma, Jack, and Lily, who embark on imaginative
            adventures in their backyard. Led by Emma's fearless spirit, Jack's
            playful antics, and Lily's enchanting imagination, their summer days
            become extraordinary tales of exploration and camaraderie, creating
            cherished memories that echo with the timeless joy of
            childhood. Through their boundless adventures and unbreakable bonds,
            the Henderson family's home becomes a sanctuary of laughter and
            love, where every moment is an invitation to celebrate the magic of
            togetherness."
          </p>
        </div>

        <div className={style.storySuggestions}>
          <h3 className={style.storyTitle}>Stories that are similar</h3>
          <div className={style.storyDisplay}>
            <div className={style.display}>
              <div>
                <img src="../images/woman.jpeg" alt="A woman and her library" />
                <p>A woman and her library</p>
              </div>
              <div>
                <img src="../images/dog.jpeg" alt="Let's go to space!" />
                <p>Let's go to space!</p>
              </div>
              <div>
                <img src="../images/girl.jpeg" alt="My Kingdom" />
                <p>My Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
