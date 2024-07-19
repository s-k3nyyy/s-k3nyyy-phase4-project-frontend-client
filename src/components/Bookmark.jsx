import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
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
                const response = await axios.get('https://phase4-project-backend-server-jd0h9f0m6-njvugushs-projects.vercel.app/events');
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
            <NavLink exact to="/home" activeClassName="active-link" className="home-icon">
                <span className="material-symbols-outlined">home</span>
            </NavLink>

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