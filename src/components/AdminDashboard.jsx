import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [message, setMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editEventId, setEditEventId] = useState(null);
    const [viewEvent, setViewEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEventListVisible, setIsEventListVisible] = useState(true);
    const [ticketsRemaining, setTicketsRemaining] = useState(0);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'https://phase4-project-backend-server-2.onrender.com', // Adjust base URL to match your Flask server
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchEvents();
            fetchUsers();
        }
    }, [navigate]);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/events');
            setEvents(response.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching events:', error);
            setMessage('Error fetching events. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/users'); // Adjust endpoint to fetch users
            setUsers(response.data);
            setMessage('');
        } catch (error) {
            console.error('Error fetching users:', error);
            setMessage('Error fetching users. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateOrUpdateEvent = async (event) => {
        try {
            let response;
            if (isEditMode) {
                response = await api.put(`/event/update/${editEventId}`, event);
            } else {
                response = await api.post('/event/create', event);
            }
            console.log('Event created or updated:', response.data);
            resetForm();
            fetchEvents();
        } catch (error) {
            console.error('Error creating or updating event:', error);
            setMessage('Error creating or updating event. Please try again.');
        }
    };
    const userDelete = async (user_id) => {
        try {
            const response = await api.delete(`/user/delete/${user_id}`);
            console.log('Users deleted:', response.data);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting users:', error);
            setMessage('Error deleting users. Please try again.');
        }
    }
 const handleDeleteEvent = async (eventId) => {
    try {
        const response = await api.delete(`/event/${eventId}/delete`);
        console.log('Event deleted:', response.data);
        fetchEvents();
    } catch (error) {
        console.error('Error deleting event:', error);
        setMessage('Error deleting event. Please try again.');
    }
};

    const handleViewMoreClick = async (eventId) => {
        try {
            const response = await api.get(`/events/${eventId}`);
            setViewEvent(response.data);
        } catch (error) {
            console.error('Error fetching event details:', error);
            setMessage('Error fetching event details. Please try again.');
        }
    };

    const handleEditEvent = (event) => {
        setTitle(event.title);
        setDescription(event.description);
        setTicketPrice(event.ticket_price.toString());
        setPhotoUrl(event.photo_url || '');
        setEventDate(new Date(event.event_date).toISOString().slice(0, 16));
        setIsEditMode(true);
        setEditEventId(event.id);
        setTicketsRemaining(event.tickets_remaining);
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setTicketPrice('');
        setPhotoUrl('');
        setEventDate('');
        setIsEditMode(false);
        setEditEventId(null);
        setTicketsRemaining(0);
    };

    const toggleEventListVisibility = () => {
        setIsEventListVisible(!isEventListVisible);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const handleIncreaseTickets = () => {
        setTicketsRemaining(ticketsRemaining + 1);
    };

    const handleDecreaseTickets = () => {
        if (ticketsRemaining > 0) {
            setTicketsRemaining(ticketsRemaining - 1);
        }
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
                    <form className="admin-dashboard-form" onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateOrUpdateEvent({
                            title,
                            description,
                            ticket_price: parseFloat(ticketPrice),
                            photo_url: photoUrl,
                            event_date: eventDate,
                            tickets_remaining: ticketsRemaining,
                        });
                    }}>
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
                        <div className="tickets-remaining">
                            <label>Tickets Remaining:</label>
                            <div className="tickets-input-group">
                                <button type="button" onClick={handleDecreaseTickets}>-</button>
                                <input
                                    type="number"
                                    value={ticketsRemaining}
                                    onChange={(e) => setTicketsRemaining(parseInt(e.target.value))}
                                    min="0"
                                    step="1"
                                    required
                                />
                                <button type="button" onClick={handleIncreaseTickets}>+</button>
                            </div>
                        </div>
                        <button type="submit">{isEditMode ? 'Update Event' : 'Create Event'}</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>

                <div className="events-list-section">
                    <h3 className='listing'>Events List</h3>
                    <button className="dropdown-button" onClick={toggleEventListVisibility}>
                        {isEventListVisible ? 'Hide Events' : 'Show Events'}
                        <span className={`dropdown-arrow ${isEventListVisible ? 'up' : 'down'}`}></span>
                    </button>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        isEventListVisible && (
                            <div className="events-list">
                                {events.map((event) => (
                                    <div key={event.id} className="event-card">
                                        <h4>{event.title}</h4>
                                        <p>{event.description}</p>
                                        <p>Ticket Price: ksh: {event.ticket_price}</p>
                                        <p>Event Date: {new Date(event.event_date).toLocaleString()}</p>
                                        <p>Tickets Remaining: {event.tickets_remaining}</p>
                                        {event.photo_url && <img src={event.photo_url} alt={event.title} className="event-photo" />}
                                        <button onClick={() => handleEditEvent(event)}>Edit Event</button>
                                        <button onClick={() => handleDeleteEvent(event.id)}>Delete Event</button>
                                        <button onClick={() => handleViewMoreClick(event.id)}>View More</button>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>

                <div className="users-list-section">
                    <h3 className='user'>Users List</h3>
                    <div className="users-list">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <div key={user.id} className="user-card">
                                    <h4>{user.username}</h4>
                                    <p>Email: {user.email}</p>
                                    <p>Phone Number: {user.phone_number}</p>
                                    <button onClick={() => userDelete(user.id)}>Delete user</button>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
