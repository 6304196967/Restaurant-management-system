import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Search, Person, ShoppingCart } from "@mui/icons-material"; // Importing icons
import "../../styles/categories.css";

function Navbar() {
  return (
    <AppBar position="sticky" className="navbar1" sx={{ backgroundColor: "#fff", boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h5" className="logo">Royal Feast</Typography>
        <Box className="nav-links1" sx={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
          <Link to="/customer/Mcategories" style={{ textDecoration: "none", color: "inherit" }}>Menu</Link>
          <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>About Us</Link>
          <Link to="/customer/myorders" style={{ textDecoration: "none", color: "inherit" }}>Orders</Link>
          <Link to="/customer/reservation" style={{ textDecoration: "none", color: "inherit" }}>Reservation</Link>
        </Box>
        
        <IconButton className="icon-button"><Person /></IconButton>
        <Link to="/customer/cart" style={{ color: "inherit" }}>
          <IconButton className="icon-button"><ShoppingCart /></IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
