import React, { useState } from 'react';
import '../styles/Chatbot.css'; // Import the animation styles
import robotImage from '../assets/cute-astronaut.png'; // Import the PNG image

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-icon-wrapper" onClick={toggleChat}>
        <img src={robotImage} alt="Chatbot Icon" className="dynamic-astronaut" />
        <div className="glowing-halo"></div>
        <div className="starfield"></div>
      </div>
      {isChatOpen && (
        <div className="chat-window">
          <p>Welcome to CosmoScope AI Chat!</p>
          {/* You can add more chatbot functionality here */}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
