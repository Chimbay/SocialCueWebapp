import React from "react";
import { useParams } from 'react-router-dom';

import "./index.css";

export default function StoryLayout() {

  const {pathID} = useParams();

  return (
    <>
      <div className="story-scenery">
        <img className="story-image" src="story-page-1.jpg" />
        <p className="story-text">
          In the Henderson backyard, Emma, Jack, and Lily played joyfully, their
          laughter filling the air. As they raced and danced, one couldn't help
          but smile, feeling the warmth of their happiness. What{" "}
          <button id="webcamButton">emotion</button> is the family experiencing?
        </p>
      </div>

      <div className="story-description">
        <div className="story-details">
          <h3 className="story-title">Story Title</h3>
          <div className="story-info">
            <div className="story-author">
              <span className="label">Author:</span>
              <span className="namee">Anthony Chimbay</span>
            </div>
            <div className="age-rating">
              <span className="label">Age-rating:</span>
              <span className="name">6+</span>
            </div>
            <div className="story-read-time">
              <span className="label">Read time:</span>
              <span className="name">3+ mins</span>
            </div>
          </div>
        </div>

        <div className="emotion-details">
          <h3 className="story-title">Emotions focused on</h3>
          <div className="emotion-list">
            <span className="emotion-present">Happiness</span>
            <span className="emotion-present">Excitement</span>
          </div>
        </div>

        <div className="story-summary">
          <h3 className="story-title">Description</h3>
          <p className="description">
            "In a vibrant neighborhood, the Henderson family's home radiates
            with the laughter of Emma, Jack, and Lily, who embark on imaginative
            adventures in their backyard. Led by Emma's fearless spirit, Jack's
            playful antics, and Lily's enchanting imagination, their summer days
            become extraordinary tales of exploration and camaraderie, creating
            cherished memories that echo with the timeless joy of
            childhood.Through their boundless adventures and unbreakable bonds,
            the Henderson family's home becomes a sanctuary of laughter and
            love, where every moment is an invitation to celebrate the magic of
            togetherness."
          </p>
        </div>

        <div className="story-suggestions">
          <h3 className="story-title">Story's that are simliar</h3>
          <div className="story-display">
            <div className="display">
              <div>
                <img src="../images/woman.jpeg" />
                <p>A woman and her library</p>
              </div>
              <div>
                <img src="../images/dog.jpeg" />
                <p>Lets go to space!</p>
              </div>
              <div>
                <img src="../images/girl.jpeg" />
                <p>My Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
