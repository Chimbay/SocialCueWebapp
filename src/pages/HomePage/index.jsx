import React from 'react'
import Carousel from '../../components/Carousel'
import HomeButtons from '../../components/HomeButtons'

import style from './index.module.css'

export default function HomePage() {
    return (
        <div className={style.mainContent}>
            <Carousel />
            <HomeButtons />
        </div>
    )
}