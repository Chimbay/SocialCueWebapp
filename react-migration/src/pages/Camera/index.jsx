import React, { useCallback, useState } from 'react';

import Webcam from '../../components/Webcam/webcam'

import './index.css'


export default function Camera() {
    const [clicked, setClicked] = useState(false);
    const [outputBlend, setOutputBlend] = useState([]);

    const handleBlendShapesData = useCallback((data) => {
        const result = {};
        for (const [head, labels] of Object.entries(data)) {
            for (const [index, array] of Object.entries(labels.categories)) {
                var catergoryName = array.categoryName;
                var score = array.score;
                result[catergoryName] = score;
            }
        }
        setOutputBlend(result);
    }, []);

    return (
        <div className='main-content'>
            <div className='left-side'>
                <div className='webcam'>
                    {clicked && <Webcam blendValueProp={handleBlendShapesData} />}
                </div>
                <button className='button-webcam' onClick={() => setClicked(!clicked)}>
                    {clicked ? 'Hide Webcam' : 'Show Webcam'}
                </button>
            </div>

            <div className='right-side'>
                {Object.entries(outputBlend).map(([name, value]) => (
                    <div>
                        <span>{name} </span>
                        <span style={{
                            display: 'inline-block',
                            width: `calc(${value * 100}px)`,
                            backgroundColor: 'red'
                        }}>{value.toFixed(5)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}