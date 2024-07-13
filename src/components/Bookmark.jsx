import React, { useState, useEffect } from "react";
import "./Bookmark.css";

const BASE_URL = "http://127.0.0.1:5555";

const Bookmark = () => {
  const [eventBookmarks, setEventBookmarks] = useState([]);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [editingEventBookmark, setEditingEventBookmark] = useState(null);
  const [updatedEventBookmark, setUpdatedEventBookmark] = useState({
    user_id: "",
    event_id: "",
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEventBookmarks();
    checkAdminStatus();
    fetchUsers();
    fetchEvents();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${BASE_URL}/check_admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to check admin status");
      }
      const data = await response.json();
      setIsAdmin(data.is_admin);
    } catch (error) {
      console.error("Check admin status error:", error);
      showAlert("Failed to check admin status", "error");
    }
  };

  const fetchEventBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${BASE_URL}/eventbookmarks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch event bookmarks");
      }
      const data = await response.json();
      setEventBookmarks(data);
    } catch (error) {
      console.error("Fetch event bookmarks error:", error);
      showAlert("Failed to fetch event bookmarks", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch users error:", error);
      showAlert("Failed to fetch users", "error");
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Fetch events error:", error);
      showAlert("Failed to fetch events", "error");
    }
  };

  const handleCreateEventBookmark = async () => {
    try {
      if (!userId || !eventId) {
        showAlert("Both User ID and Event ID are required", "error");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${BASE_URL}/eventbookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, event_id: eventId }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          if (responseData.message === "User not found") {
            showAlert("User not found", "error");
          } else if (responseData.message === "Event not found") {
            showAlert("Event not found", "error");
          } else {
            showAlert("Error creating event bookmark", "error");
          }
        } else {
          throw new Error("Failed to create event bookmark");
        }
        return;
      }

      setEventBookmarks([...eventBookmarks, responseData.eventbookmark]);
      setUserId("");
      setEventId("");
      showAlert("Event bookmark created successfully", "success");
    } catch (error) {
      console.error("Create event bookmark error:", error);
      showAlert("Failed to create event bookmark", "error");
    }
  };

  const handleDeleteEventBookmark = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${BASE_URL}/eventbookmarks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete event bookmark");
      }
      setEventBookmarks(eventBookmarks.filter((event) => event.id !== id));
      showAlert("Event bookmark deleted successfully", "success");
    } catch (error) {
      console.error("Delete event bookmark error:", error);
      showAlert("Failed to delete event bookmark", "error");
    }
  };

  const handleUpdateEventBookmark = (eventBookmark) => {
    setEditingEventBookmark(eventBookmark);
    setUpdatedEventBookmark({
      user_id: eventBookmark.user_id,
      event_id: eventBookmark.event_id,
    });
  };

  const handleUpdateSubmit = async (eventBookmarkId) => {
    const token = localStorage.getItem("token");
    try {
      const userExists = users.some(
        (user) => user.id === parseInt(updatedEventBookmark.user_id)
      );
      const eventExists = events.some(
        (event) => event.id === parseInt(updatedEventBookmark.event_id)
      );

      if (!userExists) {
        showAlert("User not found", "error");
        return;
      }

      if (!eventExists) {
        showAlert("Event not found", "error");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/eventbookmarks/${eventBookmarkId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedEventBookmark),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event bookmark");
      }

      const responseData = await response.json();

      const updatedUser = users.find(
        (user) => user.id === parseInt(responseData.user_id)
      );
      const updatedEvent = events.find(
        (event) => event.id === parseInt(responseData.event_id)
      );

      const updatedEventBookmarkWithDetails = {
        ...responseData,
        user: updatedUser,
        event: updatedEvent,
      };

      setEventBookmarks(
        eventBookmarks.map((eb) =>
          eb.id === eventBookmarkId ? updatedEventBookmarkWithDetails : eb
        )
      );
      setEditingEventBookmark(null);
      showAlert("Event bookmark updated successfully", "success");
    } catch (error) {
      console.error("Error updating event bookmark:", error);
      showAlert("Failed to update event bookmark", "error");
    }
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
      setAlertMessage("");
      setAlertType("");
    }, 3000);
  };

  return (
    <div className="container">
      {alertMessage && (
        <div className={`alert alert-${alertType}`}>{alertMessage}</div>
      )}
      <h2>Event Bookmarks</h2>
      {isAdmin && (
        <div className="create-event-bookmark mb-4">
          <h3>Create Event Bookmark</h3>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Event ID"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary"
                onClick={handleCreateEventBookmark}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        {eventBookmarks.map((eventBookmark) => (
          <div key={eventBookmark.id} className="col-md-6 mb-4">
            <div className="card event-bookmark-card">
              <div className="card-body">
                <h5 className="card-title">
                  User:{" "}
                  {
                    users.find((user) => user.id === eventBookmark.user_id)
                      ?.username
                  }
                </h5>
                <p className="card-text">
                  Event:{" "}
                  {
                    events.find((event) => event.id === eventBookmark.event_id)
                      ?.title
                  }
                </p>
                <p className="card-text">
                  Location:{" "}
                  {
                    events.find((event) => event.id === eventBookmark.event_id)
                      ?.location
                  }
                </p>
                <p className="card-text">
                  Date:{" "}
                  {new Date(
                    events.find(
                      (event) => event.id === eventBookmark.event_id
                    )?.date_time
                  ).toLocaleString()}
                </p>
                {isAdmin && (
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning mr-2"
                      onClick={() => handleUpdateEventBookmark(eventBookmark)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteEventBookmark(eventBookmark.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
                {isAdmin && editingEventBookmark?.id === eventBookmark.id && (
                  <div className="mt-3">
                    <h5>Edit Event Bookmark</h5>
                    <div className="row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="User ID"
                          value={updatedEventBookmark.user_id}
                          onChange={(e) =>
                            setUpdatedEventBookmark({
                              ...updatedEventBookmark,
                              user_id: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Event ID"
                          value={updatedEventBookmark.event_id}
                          onChange={(e) =>
                            setUpdatedEventBookmark({
                              ...updatedEventBookmark,
                              event_id: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleUpdateSubmit(eventBookmark.id)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmark;
