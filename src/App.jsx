import Navbar from "./components/Navbar";
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TypesOfEmotions from "./pages/TypesOfEmotions";
import Stories from "./pages/Stories";
import Achievements from "./pages/Achievements";
import Camera from "./pages/Camera";
import Scenarios from "./pages/Scenarios";
import Story from "./pages/Story";
import Popup from "./components/Popup";
import Playground from "./pages/Playground";
import EmotionExplorer from "./components/EmotionExplorer";
import EmotionQuiz from "./components/EmotionQuiz";
import EmotionTest from "./components/EmotionTest";
import AccountForm from "./pages/AccountForm";

function App() {
  return (
    <>
      {/* <Popup /> */}
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Playground" element={<Playground />}>
          <Route path="Learning/:groundPathID" element={<EmotionExplorer />} />
          <Route path="Quiz/:groundPathID" element={<EmotionQuiz />} />
          <Route path="Test/:groundPathID" element={<EmotionTest />} />
          <Route path="/AccountForm/:formStatus" element={<AccountForm />} />
        </Route>

        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/TypesOfEmotions" element={<TypesOfEmotions />} />
        <Route path="/Scenarios" element={<Scenarios />} />
        <Route path="/Stories" element={<Stories />}>
          <Route path="genre" element={<Stories />} />
          <Route path=":pathID" element={<Story />} />
        </Route>
        <Route path="/Camera" element={<Camera />} />
      </Routes>
    </>
  );
}

export default App;
