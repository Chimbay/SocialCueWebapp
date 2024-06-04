import React, { useEffect, useRef, useState } from 'react';
import image1 from "../../images/react-img1.jpeg"
import image2 from "../../images/react-img2.jpeg"
import image3 from "../../images/react-img3.jpeg"

import './index.css'

export default function Carousel() {
    const [imgIndex, setImgIndex] = useState(0);
    const urlArray = [image1, image2, image3];

    function previous() {
        setImgIndex((prevIndex) => (prevIndex === 0 ? urlArray.length - 1 : prevIndex - 1));
    }
    function forward() {
        setImgIndex((prevIndex) => (prevIndex === urlArray.length - 1 ? 0 : prevIndex + 1));
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            forward();
        }, 4000);

        return () => clearInterval(intervalId);
    }, [imgIndex]);

    return (
        <div className="carousel">
            <div className="image-container">
                {urlArray.map(url => (
                    <img className='image' src={url} style={{ translate: `${-100 * imgIndex}%` }} />
                ))}
            </div>
            <div className="index-buttons">
                {urlArray.map((_, index) => (
                    <button className='index-button' onClick={() => setImgIndex(index)}></button>
                ))}
            </div>
            <button className='previous-button' onClick={previous}>previous</button>
            <button className='forward-button' onClick={forward}>forward</button>
        </div>
    );
}
