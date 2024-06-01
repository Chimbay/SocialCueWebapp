import React, { useEffect, useRef, useState } from 'react';
import image1 from "../../images/react-img1.jpeg"
import image2 from "../../images/react-img2.jpeg"
import image3 from "../../images/react-img3.jpeg"

import './index.css'

export default function HomePage() {
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
            <div className="carousel-images">
                {urlArray.map(url => (
                    <img className='image' src={url} style={{ translate: `${-100 * imgIndex}%` }} />
                ))}
            </div>
            <div className="carousel-button-container">
                {urlArray.map((_, index) => (
                    <button onClick={() => setImgIndex(index)}>{index}</button>
                ))}
            </div>
            <button onClick={previous}>previous</button>
            <button onClick={forward}>forward</button>
            <p></p>
            copyright emmanuel and anthony
        </div>
    );
}
