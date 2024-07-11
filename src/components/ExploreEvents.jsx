import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreEvents.css';

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('http://localhost:5000/events', config);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const storedLikedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
    setLikedEvents(storedLikedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedEvents', JSON.stringify(likedEvents));
  }, [likedEvents]);

  const toggleLike = (eventId) => {
    setLikedEvents((prevLikedEvents) => {
      if (prevLikedEvents.includes(eventId)) {
        return prevLikedEvents.filter(id => id !== eventId);
      } else {
        return [...prevLikedEvents, eventId];
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleShowMore = (eventId) => {
    setShowMore((prevShowMore) => ({ ...prevShowMore, [eventId]: !prevShowMore[eventId] }));
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!minPrice || event.ticket_price >= parseInt(minPrice, 10)) &&
    (!maxPrice || event.ticket_price <= parseInt(maxPrice, 10))
  );

  return (
    <div className="explore-events-container">
      <h1 className="explore-events-title">Explore Events</h1>
      <input
        type="text"
        placeholder="Search events by title..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="price-range-inputs">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="price-input"
        />
        <span>-</span>
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="price-input"
        />
      </div>
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              {event.photo_url && <img src={event.photo_url} alt={event.title} className="event-photo" />}
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-price">Ticket Price: ksh {event.ticket_price}</p>
              <p className="event-tickets-remaining">Tickets Remaining: {event.tickets_remaining}</p>
              <p className="event-date">Event Date: {new Date(event.event_date).toLocaleString()}</p>
              <button
                className={`like-button ${likedEvents.includes(event.id) ? 'liked' : ''}`}
                onClick={() => toggleLike(event.id)}>
                {likedEvents.includes(event.id) ? 'Unlike' : 'Like'}
              </button>
              <a href="#" onClick={() => handleShowMore(event.id)}>
                {showMore[event.id] ? 'Show Less' : 'View More'}
              </a>
              {showMore[event.id] && (
                <div className="event-more-info">
                  <p>{event.description}</p>
                  <button className="buy-ticket-button">Buy Ticket</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-events-message">No events found matching your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default ExploreEvents;
