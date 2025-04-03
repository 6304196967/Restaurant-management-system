import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Royal Feast</div>
      <ul className="nav-links">
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;