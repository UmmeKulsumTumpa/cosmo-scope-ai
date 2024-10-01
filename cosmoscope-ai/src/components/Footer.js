// import React from 'react';
// import '../styles/Footer.css';

// const Footer = () => {
//   return (
//     <div className="footer-container">
//       <p className="footer-credits">
//       © 2024 Cosmoscope AI. All rights reserved.<br/>
//         Built with Next.js, Tailwind CSS, and Framer Motion.
//       </p>
//     </div>
//   );
// };

// export default Footer;


import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="footer-content">
				{/* <div className="get-in-touch">
					<p>Get in touch</p>
					<div className="social-icons">
						<a href="#" aria-label="Email"><i className="fas fa-envelope"></i></a>
						<a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
						<a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
						<a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
						<a href="#" aria-label="Discord"><i className="fab fa-discord"></i></a>
					</div>
				</div> */}
				<div className="colophon">
					<p>Designed and engineered by Team#007</p>
					<p>© 2024 Cosmoscope AI. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;