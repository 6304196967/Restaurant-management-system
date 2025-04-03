import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
import { Person } from "@mui/icons-material"; // Importing icons
import "../../styles/categories.css";

function Navbar() {
  // ✅ State to Store Profile Pic
  const [profilePic, setProfilePic] = useState("");

  // ✅ Fetch User Details on Page Load
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // 🎯 Fetch Profile Pic Function
  const fetchUserProfile = async () => {
    const userEmail = localStorage.getItem("email");

    if (!userEmail) {
      console.error("No email found! Please login.");
      return;
    }

    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/user/getdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok && data.profilePic) {
        setProfilePic(data.profilePic); // ✅ Set profile pic if available
      } else {
        setProfilePic(""); // Default if no profile pic
      }
    } catch (error) {
      console.error("Error fetching profile details:", error);
      setProfilePic(""); // Show default if error
    }
  };

  return (
    <AppBar
      position="sticky"
      className="navbar1"
      sx={{ backgroundColor: "#fff", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h5" className="logo">
          Royal Feast
        </Typography>
        <Box className="nav-links1" sx={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Link to="/customer/Mcategories" style={{ textDecoration: "none", color: "inherit" }}>
            Menu
          </Link>
          <Link to="/customer/cart" style={{ textDecoration: "none", color: "inherit" }}>
            Cart
          </Link>
          <Link to="/customer/about" style={{ textDecoration: "none", color: "inherit" }}>
            About Us
          </Link>
          <Link to="/customer/myorders" style={{ textDecoration: "none", color: "inherit" }}>
            Orders
          </Link>
          <Link to="/customer/reservation" style={{ textDecoration: "none", color: "inherit" }}>
            Reservation
          </Link>
        </Box>

        {/* ✅ Show Avatar if Profile Pic Available, Else Show Default Icon */}
        <Link to="/customer/profile" style={{ color: "inherit" }}>
          <IconButton className="icon-button">
            {profilePic ? (
              <Avatar
                src={profilePic}
                alt="Profile"
                sx={{
                  width: 36,
                  height: 36,
                  objectFit: "cover",
                }}
              />
            ) : (
              <Person />
            )}
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
