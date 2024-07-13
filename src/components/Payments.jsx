import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    status: "",
    user_id: "",
    event_id: "",
    ticket_id: "",
  });
  const [editingPayment, setEditingPayment] = useState(null);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchPayments();
    fetchUsers();
    fetchEvents();
    fetchTickets();
    checkAdminStatus();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://127.0.0.1:5555/check_admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(response.data.is_admin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const validateForm = () => {
    const userExists = users.some((user) => user.id === parseInt(form.user_id));
    const eventExists = events.some(
      (event) => event.id === parseInt(form.event_id)
    );
    const ticketExists = tickets.some(
      (ticket) => ticket.id === parseInt(form.ticket_id)
    );

    if (!userExists) {
      setError("User not found");
      return false;
    }

    if (!eventExists) {
      setError("Event not found");
      return false;
    }

    if (!ticketExists) {
      setError("Ticket not found");
      return false;
    }

    setError(null);
    return true;
  };

  const createPayment = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("http://127.0.0.1:5555/payments", form);
      fetchPayments();
      setForm({
        amount: "",
        status: "",
        user_id: "",
        event_id: "",
        ticket_id: "",
      });
    } catch (error) {
      console.error("Error creating payment", error);
    }
  };

  const updatePayment = async (id) => {
    if (!validateForm()) return;

    try {
      await axios.patch(`http://127.0.0.1:5555/payments/${id}`, form);
      fetchPayments();
      setEditingPayment(null);
      setForm({
        amount: "",
        status: "",
        user_id: "",
        event_id: "",
        ticket_id: "",
      });
    } catch (error) {
      console.error("Error updating payment", error);
    }
  };

  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/payments/${id}`);
      fetchPayments();
    } catch (error) {
      console.error("Error deleting payment", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayment) {
      updatePayment(editingPayment);
    } else {
      createPayment();
    }
  };

  const handleEdit = (payment) => {
    setForm({
      amount: payment.amount,
      status: payment.status,
      user_id: payment.user.id,
      event_id: payment.event.id,
      ticket_id: payment.ticket.id,
    });
    setEditingPayment(payment.id);
  };

  return (
    <div>
      <h2 id="payment-id">Payments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isAdmin && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Status"
          />
          <input
            type="text"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            placeholder="User ID"
          />
          <input
            type="text"
            name="event_id"
            value={form.event_id}
            onChange={handleChange}
            placeholder="Event ID"
          />
          <input
            type="text"
            name="ticket_id"
            value={form.ticket_id}
            onChange={handleChange}
            placeholder="Ticket ID"
          />
          <button type="submit" id="all-btn">
            {editingPayment ? "Update Payment" : "Create Payment"}
          </button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>User Name</th>
            <th>Event Title</th>
            <th>Location</th>
            <th>Date Time</th>
            <th>Ticket Type</th>
            <th>Ticket Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.amount}</td>
              <td>{payment.status}</td>
              <td>{payment.user.username}</td>
              <td>{payment.event.title}</td>
              <td>{payment.event.location}</td>
              <td>{new Date(payment.event.date_time).toLocaleString()}</td>
              <td>{payment.ticket.ticket_type}</td>
              <td>{payment.ticket.status}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => handleEdit(payment)} id="payment-edit">
                    Edit
                  </button>
                  <button
                    onClick={() => deletePayment(payment.id)}
                    id="payment-delete"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
