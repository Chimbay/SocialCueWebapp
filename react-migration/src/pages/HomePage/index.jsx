import React from 'react'
import Carousel from '../../components/Carousel'
import HomeButtons from '../../components/HomeButtons'

import './index.css'
export default function HomePage() {
    return (
        <div className='main-content'>
            <Carousel />
            <HomeButtons />
        </div>
    )
}