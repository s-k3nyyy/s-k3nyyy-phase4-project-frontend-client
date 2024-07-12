import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Home.css';

function Home({ onLogout }) {
    const location = useLocation();
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('admin_token'));
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        if (accessToken && refreshToken) {
            // Set the tokens in local storage
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        const storedBookmarkedEvents = JSON.parse(localStorage.getItem('bookmarkedEvents')) || [];
        setBookmarkedEvents(storedBookmarkedEvents);
    }, []);

    const handleLogout = () => {
        // Remove the tokens from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        onLogout();
    };

    return (
        <div className="home-page">
            <header className='head'>
                <nav className="navbar">
                    <h1 className='logo'>
                        <span className='site-name'>Event</span><span className='site-tagline'>Booking</span>
                    </h1>
                    <ul className="nav-links">
                        <li className='material-icons'>
                            <NavLink exact to="/home" activeClassName="active-link">
                                <span className="material-symbols-outlined">home</span>
                            </NavLink>
                        </li>
                        <li><NavLink to="/pricing" activeClassName="active-link">Pricing</NavLink></li>
                        <li><NavLink to="/bookmark" activeClassName="active-link">Bookmarks</NavLink></li>
                        <li><NavLink to="/explore" activeClassName="active-link">Explore Events</NavLink></li>
                        {isAdmin && (
                            <li><NavLink to="/admin" activeClassName="active-link">Admin</NavLink></li>
                        )}
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
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
