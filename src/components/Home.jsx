import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faAdjust, faHome, faBookmark, faCompass, faStar } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

function Home({ onLogout }) {
    const [darkMode, setDarkMode] = useState(() => {
        // Check if dark mode preference is saved in localStorage
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        // Update body class based on darkMode state
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        // Save darkMode state to localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        onLogout();
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const modeButtonText = darkMode ? '☀️' : '🌙';

    return (
        <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
            <header className={`head ${darkMode ? 'dark-mode' : ''}`}>
                <nav className="navbar">
                    <h1 className="logo">
                        <span className="site-name">Event</span>
                        <span className="site-tagline">Booking</span>
                    </h1>
                    <ul className="nav-links">
                        <li><NavLink exact to="/home" activeClassName="active-link">
                            <FontAwesomeIcon icon={faHome} />
                            <span className="icon-label">Home</span>
                        </NavLink></li>
                        <li><NavLink to="/bookmark" activeClassName="active-link">
                            <FontAwesomeIcon icon={faBookmark} />
                            <span className="icon-label">Bookmarks</span>
                        </NavLink></li>
                        <li><NavLink to="/explore" activeClassName="active-link">
                            <FontAwesomeIcon icon={faCompass} />
                            <span className="icon-label">Explore Events</span>
                        </NavLink></li>
                        <li><NavLink to="/reviews" activeClassName="active-link">
                            <FontAwesomeIcon icon={faStar} />
                            <span className="icon-label">Reviews</span>
                        </NavLink></li>
                        <li><a href="#" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <span className="icon-label">Logout</span>
                        </a></li>
                        <li><button onClick={toggleDarkMode}>
                            <FontAwesomeIcon icon={faAdjust} />
                            <span className="icon-label">{modeButtonText}</span>
                        </button></li>
                    </ul>
                </nav>
                <p className="event-ticketing">Your gateway to unforgettable moments. Secure your tickets effortlessly, and make every event memorable.</p>
            </header>
            <div className="content">
                <section className="intro">
                    <h2>Welcome to Event Booking</h2>
                    <p>Our event management system helps you organize and manage events seamlessly. From booking tickets to managing attendees, we have everything covered.</p>
                </section>
                <section className="features">
                    <h2>Features</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <h3>Easy Ticket Booking</h3>
                            <p>Book tickets for your favorite events with just a few clicks.</p>
                        </div>
                        <div className="feature-item">
                            <h3>Manage Events</h3>
                            <p>Create and manage your events efficiently with our intuitive interface.</p>
                        </div>
                        <div className="feature-item">
                            <h3>User Reviews</h3>
                            <p>Read reviews from other users and share your event experiences.</p>
                        </div>
                    </div>
                </section>
                <section className="about">
                    <h2>About Us</h2>
                    <p>Event Booking is dedicated to making event management easy and accessible for everyone. Our team is passionate about creating memorable experiences for our users.</p>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
