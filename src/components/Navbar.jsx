import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      className="nav-container"
      style={{
        margin: "15px",
        justifyContent: "space-between",
        textAlign: "right",
      }}
    >
      <Link
        to={"/home/tickets"}
        style={{
          border: "",
          margin: "20px",
          padding: "20px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Tickets
      </Link>
      <Link
        to={"/home/bookmark"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Bookmarks
      </Link>{" "}
      <Link
        to={"/home/events"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Explore Events
      </Link>{" "}
      <Link
        to={"/home/payments"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Payments
      </Link>{" "}
      <Link
        to={"/home/reviews"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Reviews
      </Link>{" "}
      <Link
        to={"/home/logout"}
        style={{
          margin: "10px",
          padding: "4px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
        }}
      >
        Logout
      </Link>{" "}
    </div>
  );
}

export default Navbar;
