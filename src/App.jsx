import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Playground routes - fixed nested routing */}
        <Route path="/playground" element={<Playground />}>
          <Route path="learning/:groundPathID" element={<EmotionExplorer />} />
          <Route path="quiz/:groundPathID" element={<EmotionQuiz />} />
          <Route path="test/:groundPathID" element={<EmotionTest />} />
          <Route path="account/:formStatus" element={<AccountForm />} />
        </Route>
        
        {/* Main navigation routes */}
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/types-of-emotions" element={<TypesOfEmotions />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="/camera" element={<Camera />} />
        
        {/* Stories routes - fixed nested routing */}
        <Route path="/stories" element={<Stories />}>
          <Route path="genre" element={<Stories />} />
          <Route path=":pathID" element={<Story />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;