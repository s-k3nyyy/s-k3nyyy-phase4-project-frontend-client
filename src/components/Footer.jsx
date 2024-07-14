import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h2 className="footer-title">EventBookings</h2>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">Product</h2>
                    <ul>
                        <li>Features</li>
                        <li>Sell Event Tickets</li>
                        <li>Event Registration</li>
                        <li>Enterprise</li>
                        <li>Explore Events</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">EventBookings</h2>
                    <ul>
                        <li>About Us</li>
                        <li>Blog</li>
                        <li>Sign Up</li>
                        <li>Sign In</li>
                        <li>Affiliate</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">Help & Support</h2>
                    <ul>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>Developers</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2 className="footer-title">Compare</h2>
                    <ul>
                        <li>vs TryBooking</li>
                        <li>vs Eventbrite</li>
                        <li>vs Ticketebo</li>
                        <li>vs Ticketbooth</li>
                        <li>vs Humanitix</li>
                        <li>vs EventCreate</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-legal">
                    <ul>
                        <li>T&C for Attendees</li>
                        <li>T&C for Organisers</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-social">
                    <FontAwesomeIcon icon={faFacebookF} />
                    <FontAwesomeIcon icon={faInstagram} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faLinkedinIn} />
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
                <div className="footer-top">
                    <a href="#">Top ↑</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
