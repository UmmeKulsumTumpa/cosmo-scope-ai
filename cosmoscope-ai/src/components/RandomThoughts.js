import React, { useState } from 'react';
import '../styles/RandomThoughts.css'; // We'll add the styles for the modal here

const RandomThoughts = () => {
  const thoughts = [
    "HWO will search for Earth-like exoplanets around nearby stars.",
    "HWO's main goal is to find signs of life beyond our solar system.",
    "Exoplanets are planets that orbit stars outside our solar system.",
    "Over 5,000 exoplanets have been discovered so far.",
    "Some exoplanets may lie in the habitable zone where liquid water can exist.",
    "HWO is expected to launch in the late 2030s.",
    "Some exoplanets have extreme conditions like molten surfaces or icy clouds.",
    "The James Webb Space Telescope is helping to study exoplanet atmospheres.",
    "HWO will have advanced technology for detecting bio-signatures.",
    "Scientists use transit and radial velocity methods to detect exoplanets.",
    "Exoplanet discoveries may help us understand the formation of our own solar system.",
    "HWO could help answer one of humanity's biggest questions: Are we alone?",
    "Some exoplanets are known as 'super-Earths' due to their size.",
    "Kepler Space Telescope discovered over 2,600 exoplanets during its mission.",
    "Future missions like HWO will push the boundaries of space exploration."
  ];

  const [currentThought, setCurrentThought] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to display a random thought in a modal
  const generateRandomThought = () => {
    const randomIndex = Math.floor(Math.random() * thoughts.length);
    setCurrentThought(thoughts[randomIndex]);
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to trigger the random thought modal */}
      <button className="random-thoughts-button" onClick={generateRandomThought}>
        Random Celestial Thought
      </button>

      {/* Modal for displaying random thoughts */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content cosmic-vibe">
            <button className="close-button" onClick={closeModal}>✗
            </button>
            <p>{currentThought}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomThoughts;
