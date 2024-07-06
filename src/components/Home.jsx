import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook from react-router-dom
import './home.css';

function Home({ onLogout }) {
  const location = useLocation();

  return (
    <div className={`home-page ${location.pathname === '/home' ? 'show-background' : ''}`}>
      <header className='head'>
        <nav>
          <h1 className='logo'>
            <span className='site-name'>Event</span><span className='site-tagline'>Booking</span>
          </h1>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/events">Create Event</Link></li>
            <li><Link to="/explore">Explore Events</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
      </header>
      {/* Your home page content */}
    </div>
  );
}

export default Home;
