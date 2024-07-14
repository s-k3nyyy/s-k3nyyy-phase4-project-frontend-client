import React from "react";
import "./Home.css";
import NavBar from "./Navbar";
import Footer from "./Footer";
import ExploreEvents from "./ExploreEvents";

function Home() {
  return (
    <div>
      <NavBar />
      <div>
        <ExploreEvents />
        <p style={{ color: "gold" }}>
          {" "}
          Your gateway to unforgettable moments. Secure your tickets
          effortlessly, and make every event memorable.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
