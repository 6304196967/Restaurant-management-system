import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar1">
      <div className="logo1">Royal Feast</div>
      <ul className="nav-links1">
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;