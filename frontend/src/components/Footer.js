import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';  // Importing custom CSS for footer styles

function Footer() {
  return (
    <footer className="footer">
        {/* Adding Font Awesome stylesheet for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        </link>
        {/* Horizontal line separating the footer */}
        <hr></hr>
      <div className="footer-content">
        
        {/* Section for the brand name and description */}
        <div className="footer-section">
          <h3>The Bernabeu</h3>
          <p>Your one-stop shop for all things football.</p>
        </div>
        
        {/* Section for quick navigation links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Section for contact details */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: prasham9114@gmail.com</p>
          <p>Phone: +91 9726733369</p>
        </div>
        
        {/* Section for social media links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* Social media icons */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="footer-bottom">
        <p>&copy; 2024 The Bernabeu. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
