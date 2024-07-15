import React, { useState, useEffect } from "react";
import "./ExploreEvents.css";

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEventData, setNewEventData] = useState({
    title: "",
    description: "",
    location: "",
    date_time: "",
    organizer_id: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchEvents();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5555/check_admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAdmin(data.is_admin);
      })
      .catch((error) => {
        console.error("Error checking admin status:", error);
      });
  };

  const fetchEvents = () => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:5555/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Fetch events failed:", response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const handleDelete = (eventId) => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:5555/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setEvents(events.filter((event) => event.id !== eventId));
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const handleUpdate = (event) => {
    setEditingEvent(event);
  };

  const handleUpdateSubmit = (eventId) => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:5555/events/${eventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingEvent),
    })
      .then((response) => {
        if (response.ok) {
          fetchEvents();
          setEditingEvent(null);
        }
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formattedDateTime = new Date(newEventData.date_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5555/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newEventData, date_time: formattedDateTime }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Error creating event");
          });
        }
        return response.json();
      })
      .then(() => {
        fetchEvents();
        setNewEventData({
          title: "",
          description: "",
          location: "",
          date_time: "",
          organizer_id: "",
        });
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEventData({ ...newEventData, [name]: value });
  };

  const handleLike = (eventId) => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      console.error("No user ID found in local storage.");
      return;
    }

    const eventToUpdate = events.find((event) => event.id === eventId);

    if (!eventToUpdate) {
      console.error(`Event with ID ${eventId} not found in local state.`);
      return;
    }

    const isLiked = eventToUpdate.liked;
    const url = `http://127.0.0.1:5555/events/${eventId}/like`;
    const method = isLiked ? "DELETE" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        user_id: userId,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(
              data.message || `Failed to ${isLiked ? "unlike" : "like"} event`
            );
          });
        }
      })
      .then((data) => {
        console.log("Like/unlike successful:", data);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, liked: !isLiked } : event
          )
        );
      })
      .catch((error) => {
        console.error(`Error ${isLiked ? "unliking" : "liking"} event:`, error);
        alert(
          `Failed to ${
            isLiked ? "unlike" : "like"
          } event. Please try again later.`
        );
      });
  };

  return (
    <div>
      <h2>Events</h2>
      {isAdmin && (
        <div>
          <form onSubmit={handleCreateEvent}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newEventData.title}
              onChange={handleInputChange}
            />{" "}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newEventData.description}
              onChange={handleInputChange}
            />{" "}
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newEventData.location}
              onChange={handleInputChange}
            />{" "}
            <input
              type="datetime-local"
              name="date_time"
              value={newEventData.date_time}
              onChange={handleInputChange}
            />{" "}
            <input
              type="text"
              name="organizer_id"
              placeholder="Organizer ID"
              value={newEventData.organizer_id}
              onChange={handleInputChange}
            />{" "}
            <button type="submit">Create Event</button>
          </form>
        </div>
      )}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-details">
              {editingEvent && editingEvent.id === event.id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editingEvent.title}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        title: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <input
                    type="text"
                    name="description"
                    value={editingEvent.description}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        description: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <input
                    type="text"
                    name="location"
                    value={editingEvent.location}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <input
                    type="datetime-local"
                    name="date_time"
                    value={new Date(editingEvent.date_time)
                      .toISOString()
                      .slice(0, 16)}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        date_time: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <input
                    type="text"
                    name="organizer_id"
                    value={editingEvent.organizer_id}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        organizer_id: e.target.value,
                      })
                    }
                  />{" "}
                  <br />
                  <button onClick={() => handleUpdateSubmit(event.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingEvent(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date_time).toLocaleString()}
                  </p>
                  <div className="event-actions">
                    {!isAdmin && (
                      <div className="like-bookmark">
                        <button onClick={() => handleLike(event.id)}>
                          {event.liked ? "❤️" : "🤍"}
                        </button>
                        <button>Bookmark</button>
                      </div>
                    )}
                    {isAdmin && (
                      <div className="admin-actions">
                        <button onClick={() => handleUpdate(event)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(event.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreEvents;
