// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faStar, faSatellite, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons'; // Import Home icon
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar-container">
            <Link to="/" className="nav-item"> {/* Link to Home */}
                <FontAwesomeIcon icon={faHome} size="2x" title="Home" />
            </Link>
            <Link to="/articles" className="nav-item"> {/* Link to Articles */}
                <FontAwesomeIcon icon={faFileAlt} size="2x" title="Articles" />
            </Link>
            <div className="nav-item">
                <FontAwesomeIcon icon={faStar} size="2x" title="Scoring Board" />
            </div>
            <Link to="/threed-map" className="nav-item"> {/* Link to 3D Map */}
                <FontAwesomeIcon icon={faGlobe} size="2x" title="3D Map" />
            </Link>
            <div className="nav-item">
                <FontAwesomeIcon icon={faSatellite} size="2x" title="News Section" />
            </div>
        </div>
    );
};

export default Navbar;
