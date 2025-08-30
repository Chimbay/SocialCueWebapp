import React, { useEffect, useRef, useState } from "react";
import style from "./index.module.css";

export default function HomeRoundCarousel() {
  const [startingPositions, setStartingPositions] = useState(null);
  const [translatingPositions, setTranslatingPositions] = useState(null);
  const [translatingRotation, setTranslatingRotation] = useState(null);

  const [startingAngle, setStartingAngle] = useState(0);
  const [startingPoint, setStartingPoint] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [randomColors, setRandomColors] = useState([]);
  const [currAngle, setCurrAngle] = useState(null);

  const roundCarouselRef = useRef(null);
  const circleRef = useRef(null);

  const numImages = 4;
  const radius = 150;
  let images = {};

  for (let i = 1; i <= numImages; i++) {
    images[i] = i;
  }

  useEffect(() => {
    if (roundCarouselRef.current) {
      calculateCircle();
      const colors = Object.keys(images).map(() => getRandomColor());
      setRandomColors(colors);
    }
    initialPositioning();
  }, []);

  const calculateCircle = () => {
    const w = roundCarouselRef.current.offsetWidth;
    const h = roundCarouselRef.current.offsetHeight;
    const circle = {
      centerX: w / 2,
      centerY: h / 2,
      radius: radius,
    };
    circleRef.current = circle;
  };

  function getRandomColor() {
    // Function to generate a random hex color
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function initialPositioning() {
    const numOfEmotions = Object.keys(images).length;
    const sections = calculateEmotionIntervals();
    console.log(sections)
    const startingPositions = positionCalc();
    setStartingPositions(startingPositions);
    setTranslatingPositions(startingPositions);

    function calculateEmotionIntervals() {
      const intervals = 360 / numOfEmotions;
      let sections = [];
      for (let i = 0; i < numOfEmotions; i++) {
        const point = i * intervals;
        sections.push(point);
      }
      return sections;
    }
    function positionCalc() {
      const circle = circleRef.current;
      const intervals = 360 / numOfEmotions;

      let points = [];
      let divRotations = [];
      let adjAngles = [];
      for (let i = 0; i < sections.length; i++) {
        const angleOfPoint = sections[i];
        const angleRadians = angleOfPoint * (Math.PI / 180);
        const x = circle.centerX - radius * Math.sin(angleRadians);
        const y = circle.centerY - radius * Math.cos(angleRadians);

        const angleOfRot = sections[i];
        const angleRadiansRot = angleOfRot * (Math.PI / 180);
        const xRot = x - circle.centerX / 2 * Math.sin(angleRadiansRot);
        const yRot = y - circle.centerX / 2 * Math.cos(angleRadiansRot);

        points.push({
          x: x,
          y: y,
        });
        divRotations.push({
          x: xRot,
          y: yRot,
          angle: angleOfRot + intervals / 2,
        });
        adjAngles.push({
          angle: angleOfRot + intervals / 2,
        });
      }
      setCurrAngle(adjAngles);
      setTranslatingRotation(divRotations);
      return points;
    }
  }

  const movingPositioning = (event) => {
    if (event.clientX === 0 || event.clientY === 0) return;

    const divRect = roundCarouselRef.current.getBoundingClientRect();
    const circle = circleRef.current;
    const proportionToCenter = {
      x: event.clientX - (divRect.x + circle.centerX),
      y: event.clientY - (divRect.y + circle.centerY),
    };
    const theta = calculateMovingAngleXY();

    if (startingAngle == 0 && startingPoint == 0) {
      setStartingAngle(theta);
      setStartingPoint(proportionToCenter);
      setIsMoving(true);
    }
    if (isMoving) {
      const movedPositions = calculateMovingPositions();
      setTranslatingPositions(movedPositions);
    }

    function calculateMovingAngleXY() {
      const radians = Math.atan2(proportionToCenter.y, -proportionToCenter.x);
      let angle = (radians * (180 / Math.PI) + 90) % 360;

      if (angle < 0) {
        angle += 360;
      }

      if (startingAngle !== 0) {
        angle = (angle - startingAngle + 360) % 360;
      }
      return angle;
    }

    function calculateMovingPositions() {
      const circle = circleRef.current;
      let points = [];
      let divRotations = [];

      for (let i = 0; i < startingPositions.length; i++) {
        const initialPoint = {
          x: startingPositions[i].x,
          y: startingPositions[i].y,
        };
        const xTrans = initialPoint.x - circle.centerX;
        const yTrans = initialPoint.y - circle.centerY;

        const rads = theta * (Math.PI / 180);
        const xRot = xTrans * Math.cos(rads) - yTrans * Math.sin(rads);
        const yRot = xTrans * Math.sin(rads) + yTrans * Math.cos(rads);

        const xPrime = xRot + circle.centerX;
        const yPrime = yRot + circle.centerY;

        let dx2 = startingPoint.x;
        let dy2 = startingPoint.y;
        let startAngle = (Math.atan2(dy2, dx2) * (180 / Math.PI)) % 360;
        if (startAngle < 0) {
          startAngle += 360;
        }

        let dx = proportionToCenter.x;
        let dy = proportionToCenter.y;
        let newAngle = (Math.atan2(dy, dx) * (180 / Math.PI)) % 360;
        if (newAngle < 0) {
          newAngle += 360;
        }
        let adjAngle = startAngle - newAngle;
        if (adjAngle < 0) {
          adjAngle += 360;
        }

        points.push({
          x: xPrime,
          y: yPrime,
          angle: newAngle,
        });
        divRotations.push({
          angle: currAngle[i].angle - adjAngle,
        });
      }
      setTranslatingRotation(divRotations);
      return points;
    }
  };

  // Add this function to remove ghost drag image
  const handleDragStart = (event) => {
    const emptyImg = new Image();
    emptyImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(emptyImg, 0, 0);
  };

  const handleDragEnd = () => {
    let arr = [];
    for (let i = 0; i < startingPositions.length; i++) {
      arr.push({
        angle: translatingRotation[i].angle,
      });
    }
    setCurrAngle(arr);
    setStartingAngle(0);
    setStartingPoint(0);
    setIsMoving(false);
    setStartingPositions(translatingPositions);
  };

  return (
    <div className={style.roundCarousel} ref={roundCarouselRef}>
      {startingPositions &&
        Object.entries(images).map(([key], index, array) => (
          <div className={style.section} key={key}>
            <div
              className={style.container}
              style={{
                transform: `rotate(${translatingRotation[index].angle}deg)`,
              }}
            >
              <div
                className={style.sectionBackground}
                style={{
                  backgroundColor: randomColors[index],
                }}
                draggable="true"
                onDragStart={handleDragStart}
                onDrag={movingPositioning}
                onDragEnd={handleDragEnd}
              ></div>
            </div>
  
            <div
              className={style.images}
              style={{
                backgroundColor: "white",
                top: translatingPositions[index]?.y,
                right: translatingPositions[index]?.x,
              }}
            ></div>
          </div>
        ))}
    </div>
  );
}