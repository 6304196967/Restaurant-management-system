import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Royal Feast</div>
      <ul className="nav-links">
        <li><Link to="/admin/home">Home</Link></li>
        <li><Link to="/admin/menu">Menu</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/feedbacks">Feedbacks</Link></li>
        <li><Link to="/admin/reservations">Reservations</Link></li>
        <li><Link to="/admin/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;