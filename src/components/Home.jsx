import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Home.css';

function Home({ onLogout }) {
    const location = useLocation();
    const isAdmin = localStorage.getItem('admin_token'); // Check if the admin token exists
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        const storedBookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents')) || [];
        setBookmarkedEvents(storedBookmarkedEvents);
    }, []);

    return (
        <div className="home-page">
            <header className='head'>
                <nav className="navbar">
                    <h1 className='logo'>
                        <span className='site-name'>Event</span><span className='site-tagline'>Booking</span>
                    </h1>
                    <ul className="nav-links">
                        <li><NavLink exact to="/home" activeClassName="active-link">Home</NavLink></li>
                        <li><NavLink to="/pricing" activeClassName="active-link">Pricing</NavLink></li>
                        <li><NavLink to="/bookmark" activeClassName="active-link">Bookmarks</NavLink></li>
                        <li><NavLink to="/explore" activeClassName="active-link">Explore Events</NavLink></li>
                        {isAdmin && (
                            <li><NavLink to="/admin" activeClassName="active-link">Admin</NavLink></li>
                        )}
                    </ul>
                </nav>
                <p className="event-ticketing">Your gateway to unforgettable moments. Secure your tickets effortlessly, and make every event memorable.</p>
            </header>
            <div className="content">
                {/* Your main content here */}
            </div>
        </div>
    );
}

export default Home;
