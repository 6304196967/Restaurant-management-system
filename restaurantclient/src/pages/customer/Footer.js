import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';
import './fontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-logo">
              <span>Royal</span>
              <span className="gold">Feast</span>
            </h3>
            <p className="footer-about">
              A culinary destination where passion meets perfection, offering an unforgettable dining experience.
            </p>
            <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
            <a href="#" aria-label="Yelp">
              <FontAwesomeIcon icon={['fab', 'yelp']} />
            </a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/customer/home">Home</Link></li>
              <li><Link to="/customer/Mcategories">Menu</Link></li>
              <li><Link to="/customer/reservations">Reservations</Link></li>
              <li><Link to="/customer/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <FontAwesomeIcon icon="map-marker-alt" />
                <span>123 Culinary Avenue<br />Foodie City, FC 12345</span>
              </li>
              <li>
                <FontAwesomeIcon icon="phone" />
                <span>(123) 456-7890</span>
              </li>
              <li>
              <FontAwesomeIcon icon="envelope" />
                <span>info@gourmethouse.com</span>
              </li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Opening Hours</h4>
            <ul className="opening-hours">
              <li>
                <span>Monday - Thursday</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li>
                <span>Friday - Saturday</span>
                <span>11:00 AM - 11:00 PM</span>
              </li>
              <li>
                <span>Sunday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
              <li className="holiday-note">
                <span>Holidays may have special hours</span>
              </li>
            </ul>
          </div>
        </div>
        
      <div className="copyright">
            <p>&copy; {currentYear} Gourmet House. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      
    </footer>
  );
};

export default Footer;