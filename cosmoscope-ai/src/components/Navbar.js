import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faStar, faSatellite, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div className="nav-item">
                <FontAwesomeIcon icon={faFileAlt} size="2x" title="Articles" />
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faStar} size="2x" title="Scoring Board" />
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faGlobe} size="2x" title="3D Map" />
            </div>
            <div className="nav-item">
                <FontAwesomeIcon icon={faSatellite} size="2x" title="News Section" />
            </div>
        </div>
    );
};

export default Navbar;
