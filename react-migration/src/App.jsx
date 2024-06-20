import Navbar from "./components/Navbar";
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TypesOfEmotions from "./pages/TypesOfEmotions";
import Stories from "./pages/Stories";
import Achievements from "./pages/Achievements";
import Camera from "./pages/Camera";
import Scenarios from "./pages/Scenarios";
import StoryLayout from "./pages/StoryLayout";
import Genre from "./pages/Genres";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/TypesOfEmotions" element={<TypesOfEmotions />} />
        <Route path="/Scenarios" element={<Scenarios />} />
        <Route path="/Stories" element={<Stories />} />
        <Route path="/Stories/genres" element={<Genre />} />
        <Route path="/Stories/:pathID" element={<StoryLayout />} />
        <Route path="/Camera" element={<Camera />} />
      </Routes>
    </>
  );
}

export default App;
