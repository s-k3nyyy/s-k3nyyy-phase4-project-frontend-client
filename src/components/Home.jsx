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
        Your gateway to unforgettable moments. Secure your tickets effortlessly,
        and make every event memorable.
      </div>
      <Footer />
    </div>
  );
}

export default Home;
