import React, { useEffect, useState } from 'react';
import './Bookmark.css';

function Bookmark() {
    const [likedEvents, setLikedEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        const storedLikedEvents = JSON.parse(localStorage.getItem('likedEvents')) || [];
        setLikedEvents(storedLikedEvents);
    }, []);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/events');
                setAllEvents(response.data);
            } catch (error) {
                console.error('Error fetching all events:', error);
            }
        };

        fetchAllEvents();
    }, []);

    const bookmarkedEvents = allEvents.filter(event => likedEvents.includes(event.id));

    return (
        <div className="bookmarked-events-container">
            <h2 className="bookmarked-events-title">Bookmarked Events</h2>
            <div className="events-grid">
                {bookmarkedEvents.map((event) => (
                    <div key={event.id} className="event-card">
                        {event.photo_url && <img src={event.photo_url} alt={event.title} className="event-photo" />}
                        <h3 className="event-title">{event.title}</h3>
                        <p className="event-description">{event.description}</p>
                        <p className="event-price">Ticket Price: ksh {event.ticket_price}</p>
                        <p className="event-date">Event Date: {new Date(event.event_date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookmark;
