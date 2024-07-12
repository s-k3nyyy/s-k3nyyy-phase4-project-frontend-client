import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ExploreEvents.css';

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showMore, setShowMore] = useState({});
  const [ticketCounts, setTicketCounts] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
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

  const handleTicketCountChange = (eventId, value) => {
    if (value <= 5 && value >= 0) {
      setTicketCounts((prevCounts) => ({ ...prevCounts, [eventId]: value }));
    }
  };

  const handleBuyTicket = (event) => {
    const eventId = event.id;
    const ticketCount = ticketCounts[eventId] || 0;
    const totalAmount = event.ticket_price * ticketCount;

    if (ticketCount > 0 && ticketCount <= 5) {
      setSummary({
        eventId,
        title: event.title,
        ticketCount,
        totalAmount
      });
    } else {
      alert('Please enter a valid number of tickets (1-5).');
    }
  };

  const handlePayment = () => {
    console.log('Processing payment for:', summary, 'Phone number:', phoneNumber);
    setSummary(null);
    setPhoneNumber('');
  };

  const handleCancel = () => {
    setSummary(null);
    setPhoneNumber('');
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!minPrice || event.ticket_price >= parseInt(minPrice, 10)) &&
    (!maxPrice || event.ticket_price <= parseInt(maxPrice, 10))
  );

  return (
    <div className="explore-events-container">
      <div className={summary ? 'blur-background' : ''}>
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
              <div
                key={event.id}
                className={`event-card ${showMore[event.id] ? 'expanded' : ''}`}
                onClick={() => handleShowMore(event.id)}
              >
                {event.photo_url && (
                  <img
                    src={event.photo_url}
                    alt={event.title}
                    className={`event-photo ${showMore[event.id] ? 'expanded-photo' : ''}`}
                  />
                )}
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <p className="event-price">Ticket Price: ksh {event.ticket_price}</p>
                <p className="event-tickets-remaining">Tickets Remaining: {event.tickets_remaining}</p>
                <p className="event-date">Event Date: {new Date(event.event_date).toLocaleString()}</p>
                <button
                  className={`like-button ${likedEvents.includes(event.id) ? 'liked' : ''}`}
                  onClick={() => toggleLike(event.id)}
                >
                  {likedEvents.includes(event.id) ? 'Unlike' : 'Like'}
                </button>
                {showMore[event.id] && (
                  <>
                    <div className="event-more-info">
                      <p>{event.description}</p>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={ticketCounts[event.id] || 0}
                      onChange={(e) => handleTicketCountChange(event.id, parseInt(e.target.value, 10))}
                      className="ticket-count-input"
                    />
                    <button onClick={() => handleBuyTicket(event)} className="buy-ticket-button">
                      Buy Ticket
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-events-message">No events found matching your criteria.</p>
          )}
        </div>
      </div>

      {summary && (
        <div className="summary-card-overlay">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <p>Event: {summary.title}</p>
            <p>Number of Tickets: {summary.ticketCount}</p>
            <p>Total Amount: ksh {summary.totalAmount}</p>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="phone-input"
            />
            <button onClick={handlePayment} className="payment-button">
              Proceed to Payment
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreEvents;
