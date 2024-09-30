import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Visualization from './components/Visualization';
import ScoringBoard from './components/ScoringBoard';
import Articles from './components/Articles';
import Navbar from './components/Navbar.js';  // Import Navbar component
import Chatbot from './components/Chatbot.js';  // Import Chatbot component
import Footer from './components/Footer.js';

const AppRoutes = () => {
  return (
    <Router>
      {/* Render Navbar here so that it's present across all pages */}
      <Navbar />  

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/scoring" element={<ScoringBoard />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>

      {/* Add Chatbot at the bottom across all pages */}
      <Chatbot />
      <Footer />
    </Router>
  );
};

export default AppRoutes;
