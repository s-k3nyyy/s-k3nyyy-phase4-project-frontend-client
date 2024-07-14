import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch("http://127.0.0.1:5555/auth/logout", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          padding: "8px 16px",
          fontSize: "16px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          outline: "none",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "red")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "blue")}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
