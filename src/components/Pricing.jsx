// Pricing.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
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
        const response = await axios.get(`https://phase4-project-backend-server.onrender.com/events/${eventId}`, config);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
        
        navigate('/pricing')
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
   
    if (!event) return; 
    console.log(`Buying ${ticketCount} tickets for event ${event.id} via ${paymentMethod}.`);
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
        </select>
      </div>
      <p>Total Amount: ksh {calculateTotalAmount()}</p>
      <button onClick={handleBuyTicket}>Buy Tickets</button>
    </div>
  );
}

export default Pricing;
