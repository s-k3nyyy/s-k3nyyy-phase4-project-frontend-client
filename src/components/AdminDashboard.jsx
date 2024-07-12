import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
    },
});

function AdminDashboard() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState('');
    const [isEventListVisible, setIsEventListVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/events', {
                title,
                description,
                ticket_price: parseFloat(ticketPrice),
                photo_url: photoUrl,
                event_date: new Date(eventDate),
            });
            if (response.status === 201) {
                setMessage('Event created successfully!');
                setTitle('');
                setDescription('');
                setTicketPrice('');
                setPhotoUrl('');
                setEventDate('');
                fetchEvents();
            } else {
                setMessage('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error);
            setMessage('Error creating event. Please try again.');
        }
    };

    const handleEditEvent = async (e) => {
        e.preventDefault();
        console.log("Editing event ID:", editEventId);
        try {
            const response = await axiosInstance.put(`/events/${editEventId}`, {
                title,
                description,
                ticket_price: parseFloat(ticketPrice),
                photo_url: photoUrl,
                event_date: new Date(eventDate),
            });
            console.log("Update response:", response);
            if (response.status === 200) {
                setMessage('Event updated successfully!');
                setTitle('');
                setDescription('');
                setTicketPrice('');
                setPhotoUrl('');
                setEventDate('');
                setIsEditMode(false);
                setEditEventId(null);
                fetchEvents();
            } else {
                setMessage('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error.response || error.message);
            setMessage('Error updating event. Please try again.');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axiosInstance.delete(`/events/${eventId}`);
            if (response.status === 200) {
                setMessage('Event deleted successfully!');
                fetchEvents();
            } else {
                setMessage('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            setMessage('Error deleting event. Please try again.');
        }
    };

    const handleEditButtonClick = (event) => {
        setTitle(event.title);
        setDescription(event.description);
        setTicketPrice(event.ticket_price.toString());
        setPhotoUrl(event.photo_url);
        setEventDate(new Date(event.event_date).toISOString().slice(0, 16));
        setIsEditMode(true);
        setEditEventId(event.id);
    };

    const toggleEventListVisibility = () => {
        setIsEventListVisible(!isEventListVisible);
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
                <h2>Admin Dashboard</h2>
                <p>Welcome to the Admin Dashboard!</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-dashboard-content">
                <div className="create-event-section">
                    <h3>{isEditMode ? 'Edit Event' : 'Create Event'}</h3>
                    <form className="admin-dashboard-form" onSubmit={isEditMode ? handleEditEvent : handleCreateEvent}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Event Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Ticket Price"
                            value={ticketPrice}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Photo URL"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Event Date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            required
                        />
                        <button type="submit">{isEditMode ? 'Update Event' : 'Create Event'}</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>

                <div className="events-list-section">
                    <h3>Events List</h3>
                    <button className="dropdown-button" onClick={toggleEventListVisibility}>
                        {isEventListVisible ? 'Hide Events' : 'Show Events'}
                        <span className={`dropdown-arrow ${isEventListVisible ? 'up' : 'down'}`}></span>
                    </button>
                    {isEventListVisible && (
                        <div className="events-list">
                            {events.map((event) => (
                                <div key={event.id} className="event-card">
                                    <h4>{event.title}</h4>
                                    <p>{event.description}</p>
                                    <p>Ticket Price: ksh: {event.ticket_price}</p>
                                    <p>Event Date: {new Date(event.event_date).toLocaleString()}</p>
                                    {event.photo_url && <img src={event.photo_url} alt={event.title} className="event-photo" />}
                                    <button onClick={() => handleEditButtonClick(event)}>Edit Event</button>
                                    <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
