import Navbar from './components/Navbar'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TypesOfEmotions from './pages/TypesOfEmotions';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/TypesOfEmotions" element={<TypesOfEmotions />} />
            </Routes>
        </>
    )
}

export default App
