import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // You can customize this as needed

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      sx={{
        background: "transparent",
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "48px", // Adjust this value to decrease the height
        }}
      >
        {/* Left: Logo/Brand */}
        <Typography
          variant="h4"
          sx={{
            background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          Royal Feast
        </Typography>

        {/* Right: Sign Up Button */}
        <Box>
          <Button
            variant="outlined"
            component={Link}
            to="/signup"
            sx={{
              color: "#FF8E53",
              borderColor: "#FF8E53",
              fontWeight: "bold",
              "&:hover": {
                background: "#FF8E53",
                color: "white",
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
