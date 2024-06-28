import React, { useEffect, useRef, useState } from "react";
import image1 from "../../images/react-img1.jpeg";
import image2 from "../../images/react-img2.jpeg";
import image3 from "../../images/react-img3.jpeg";

import style from "./index.module.css";

export default function Carousel() {
  const [imgIndex, setImgIndex] = useState(0);
  const urlArray = [image1, image2, image3];

  function previous() {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? urlArray.length - 1 : prevIndex - 1
    );
  }
  function forward() {
    setImgIndex((prevIndex) =>
      prevIndex === urlArray.length - 1 ? 0 : prevIndex + 1
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      forward();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [imgIndex]);

  return (
    <div className={style.carousel}>
      <div className={style.imageContainer}>
        {urlArray.map((url, index) => (
          <img
            className={style.image}
            src={url}
            style={{ transform: `translateX(${-100 * imgIndex}%)` }}
            key={index}
          />
        ))}
      </div>
      <div className={style.indexButtons}>
        {urlArray.map((_, index) => (
          <button
            className={style.indexButton}
            onClick={() => setImgIndex(index)}
            key={index}
          ></button>
        ))}
      </div>
      <button className={style.previousButton} onClick={previous}>
        previous
      </button>
      <button className={style.forwardButton} onClick={forward}>
        forward
      </button>
    </div>
  );
}
