// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ArticleDetails from "./components/ArticleDetails";
import ThreeDMap from './components/ThreeDMap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-wrapper">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/chatbot" element={<Chatbot />} />
			<Route path="/article/:id" element={<ArticleDetails />} />
			<Route path="/threed-map" element={<ThreeDMap />} />
          </Routes>
          <Chatbot />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;