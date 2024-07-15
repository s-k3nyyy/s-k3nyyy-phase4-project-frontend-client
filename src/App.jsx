import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import Home from "./components/Home";
import Tickets from "./components/Tickets";
import Bookmark from "./components/Bookmark";
import ExploreEvents from "./components/ExploreEvents";
import Payments from "./components/Payments";
import Reviews from "./components/Reviews";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="home" element={<Home />} />
          <Route path="home/tickets" element={<Tickets />} />
          <Route path="home/bookmark" element={<Bookmark />} />
          <Route path="home/events" element={<ExploreEvents />} />
          <Route path="home/payments" element={<Payments />} />
          <Route path="home/reviews" element={<Reviews />} />
          <Route path="home/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
