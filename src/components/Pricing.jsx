// Pricing.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Pricing() {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventId = location.pathname.split('/').pop(); // Get event id from URL
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`http://localhost:5000/events/${eventId}`, config);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
        // Redirect to ExploreEvents or show an error message as needed
        navigate('/pricing'); // Use navigate to redirect
      }
    };

    fetchEvent();
  }, [location.pathname, navigate]);

  const handleTicketChange = (event) => {
    setTicketCount(parseInt(event.target.value));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const calculateTotalAmount = () => {
    if (!event) return 0; // Handle case where event is null
    // Assuming event.ticket_price is the price per ticket
    return ticketCount * event.ticket_price;
  };

  const handleBuyTicket = () => {
    // Implement logic for purchasing tickets
    // This could involve sending a request to your backend to initiate payment
    if (!event) return; // Handle case where event is null
    console.log(`Buying ${ticketCount} tickets for event ${event.id} via ${paymentMethod}.`);
    // Redirect or handle success message after purchase
  };

  if (loading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  if (!event) {
    return <div>Error: Event not found.</div>; // Placeholder for error state
  }

  return (
    <div className="pricing-container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Ticket Price: ksh {event.ticket_price}</p>
      <p>Event Date: {new Date(event.event_date).toLocaleString()}</p>
      <div className="ticket-selector">
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={ticketCount}
          onChange={handleTicketChange}
          min="1"
        />
      </div>
      <div className="payment-method">
        <label>Select Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => handlePaymentMethodChange(e.target.value)}>
          <option value="mpesa">M-Pesa</option>
          {/* Add more payment methods here */}
        </select>
      </div>
      <p>Total Amount: ksh {calculateTotalAmount()}</p>
      <button onClick={handleBuyTicket}>Buy Tickets</button>
    </div>
  );
}

export default Pricing;
