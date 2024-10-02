import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

const HomePage = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  // Simulate fetching visitor count from server (useEffect will run once when the component mounts)
  useEffect(() => {
    const fetchVisitorCount = async () => {
      // Fetch visitor count logic here (could be API call)
      // Simulate with a local storage (for demo purposes)
      let count = localStorage.getItem('visitorCount') || 0;
      count = parseInt(count) + 1;
      localStorage.setItem('visitorCount', count);
      setVisitorCount(count);
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="home-page-container">
      {/* Visitor Counter */}
      <div className="visitor-counter">
        <p>Visitors: {visitorCount}</p>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="main-title">CosmoScope AI</h1>
        <p className="subtitle">Discover Exoplanets, Explore the Cosmos, and Unlock New Worlds</p>
        <p className="description">Crafting digital interfaces</p>
      </div>
    </div>
  );
};

export default HomePage;
