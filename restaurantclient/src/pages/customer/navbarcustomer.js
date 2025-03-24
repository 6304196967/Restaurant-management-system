import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Royal Feast</div>
      <ul className="nav-links">
        <li><Link to="/customer/home">Home</Link></li>
        <li><Link to="/customer/menu">Menu</Link></li>
        <li><Link to="/customer/cart">Cart</Link></li>
        <li><Link to="/customer/myorders">Orders</Link></li>
        <li><Link to="/customer/book">Reserve</Link></li>
        <li><Link to="/customer/about">About</Link></li>
        <li><Link to="/customer/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;