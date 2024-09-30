import React from 'react';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Articles from './components/Articles';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <HomePage />
	  <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
