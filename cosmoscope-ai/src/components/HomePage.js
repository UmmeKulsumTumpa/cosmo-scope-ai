import React, { useState, useEffect } from 'react';
import RandomThoughts from './RandomThoughts';
import '../styles/HomePage.css';

const HomePage = () => {
	const [visitorCount, setVisitorCount] = useState(0);

	// Function to increment the visitor count and update localStorage
	const incrementVisitorCount = () => {
		let count = localStorage.getItem('visitorCount') || 0; // Get the current count from localStorage
		count = parseInt(count) + 1; // Increment the count
		localStorage.setItem('visitorCount', count); // Save the updated count to localStorage
		setVisitorCount(count); // Update the state with the new count
	};

	// On component mount, increment the visitor count
	useEffect(() => {
		incrementVisitorCount();
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
			<RandomThoughts />
		</div>
	);
};

export default HomePage;
