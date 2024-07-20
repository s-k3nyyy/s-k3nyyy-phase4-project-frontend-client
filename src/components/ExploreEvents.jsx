import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExploreEvents.css';
import Bookmark from './Bookmark'; // Import Bookmark component

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
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://phase4-project-backend-server.onrender.com/events');
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
        return prevLikedEvents.filter((id) => id !== eventId);
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
        totalAmount,
      });
    } else {
      alert('Please enter a valid number of tickets (1-5).');
    }
  };

  const handlePayment = async () => {
    if (phoneNumber && paymentAmount) {
      try {
        const response = await axios.post('https://phase4-project-backend-server.onrender.com/mpesa_payment', {
          phone_number: phoneNumber,
          amount: paymentAmount,
        });
        if (response.data.ResponseCode === '0') {
          alert('Payment successful!');
        } else {
          alert('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment error. Please try again.');
      }
      setSummary(null);
      setPhoneNumber('');
      setPaymentAmount('');
    } else {
      alert('Please enter both phone number and payment amount.');
    }
  };

  const handleCancel = () => {
    setSummary(null);
    setPhoneNumber('');
    setPaymentAmount('');
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || event.ticket_price >= parseInt(minPrice, 10)) &&
      (!maxPrice || event.ticket_price <= parseInt(maxPrice, 10))
  );

  return (
    <div className="explore-events-container">
      <div className={summary ? 'blur-background' : ''}>
        <h1 className="explore-events-title">Explore Events</h1>
        <p className="explore-events-description">
          Welcome to our events page! Discover exciting events happening near you. Search by title or price range to find
          your perfect event.
        </p>
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
                  onClick={(e) => { e.stopPropagation(); toggleLike(event.id); }}
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
                      placeholder="Tickets (Max 5)"
                      value={ticketCounts[event.id] || ''}
                      onChange={(e) => handleTicketCountChange(event.id, parseInt(e.target.value, 10))}
                      className="ticket-input"
                    />
                    <button className="buy-ticket-button" onClick={(e) => { e.stopPropagation(); handleBuyTicket(event); }}>
                      Buy Ticket
                    </button>
                    <Bookmark event={event} />
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="no-events-message">No events found. Please adjust your search criteria.</p>
          )}
        </div>
      </div>
      {summary && (
        <div className="order-summary-card">
          <h2>Order Summary</h2>
          <p>Event: {summary.title}</p>
          <p>Tickets: {summary.ticketCount}</p>
          <p>Total Amount: ksh {summary.totalAmount}</p>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
          />
          <input
            type="text"
            placeholder="Payment Amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="amount-input"
          />
          <button onClick={handlePayment} className="confirm-payment-button">
            Confirm Payment
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreEvents;
