import Navbar from './components/Navbar'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import TypesOfEmotions from './pages/TypesOfEmotions';
import Stories from './pages/Stories';
import Achievements from './pages/Achievements';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Achievements" element={<Achievements />} />
                <Route path="/TypesOfEmotions" element={<TypesOfEmotions />} />
                <Route path="/Stories" element={<Stories />} />
            </Routes>
        </>
    )
}

export default App
