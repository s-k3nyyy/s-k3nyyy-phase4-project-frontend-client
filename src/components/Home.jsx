import React from 'react';
import './home.css'; // Import the CSS file

function Home({ onLogout }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Local Event Discovery</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <section className="search-bar">
        <input type="text" placeholder="Search for events..." />
        <button>Search</button>
      </section>
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="events-list">
          {/* Sample featured events */}
          <div className="event-card">
            <h3>Concert in the Park</h3>
            <p>Date: July 10, 2024</p>
            <p>Location: Central Park</p>
          </div>
          <div className="event-card">
            <h3>Art Exhibition</h3>
            <p>Date: July 15, 2024</p>
            <p>Location: Downtown Art Gallery</p>
          </div>
        </div>
      </section>
      <section className="upcoming-events">
        <h2>Upcoming Events</h2>
        <div className="events-list">
          {/* Sample upcoming events */}
          <div className="event-card">
            <h3>Farmers Market</h3>
            <p>Date: July 12, 2024</p>
            <p>Location: City Square</p>
          </div>
          <div className="event-card">
            <h3>Food Truck Festival</h3>
            <p>Date: July 18, 2024</p>
            <p>Location: Riverside Park</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
