import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import videoBg from "../../assets/food-video.webm";
import biryaniImg from "../../assets/biryani.webp";
import pizzaImg from "../../assets/biryani.webp";
import burgerImg from "../../assets/biryani.webp";
import iceCreamImg from "../../assets/biryani.webp";
import Navbar from "./navbarcustomer.js";

// ✅ Define categories with correct images
const categories = [
  { name: "Burger", img: burgerImg },
  { name: "Pizza", img: pizzaImg },
  { name: "Biryani", img: biryaniImg },
  { name: "icecream", img: iceCreamImg },
];

const Mccategories = () => {
  const navigate = useNavigate();
  const [trendingDishes, setTrendingDishes] = useState([]);
  const userEmail = localStorage.getItem("email"); // ✅ Get user email
  const [error, setError] = useState(null);

  // ✅ Fetch trending dishes on page load
  useEffect(() => {
    const fetchTrendingDishes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/menu/allitems/trending"
        );
        if (!response.ok) throw new Error("Failed to fetch trending dishes");

        const data = await response.json();
        setTrendingDishes(data);
      } catch (error) {
        console.error("Error fetching trending dishes:", error);
      }
    };

    fetchTrendingDishes();
  }, []);

  // ✅ Store category in localStorage and navigate to menu
  const handleCategoryClick = (categoryName) => {
    localStorage.setItem("selectedCategory", categoryName);
    navigate("/customer/menu");
  };

  // ✅ Add to Cart Function
  const handleAddToCart = async (item) => {
    if (!userEmail) {
      alert("User email not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/cart/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          name: item.name,
          price: item.price,
          quantity: 1, // ✅ Always add 1 item by default
          image: item.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      alert(`${item.name} added to cart! 🎉`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="homepage-container">
      <Navbar />
      {/* Hero Section */}
      <Box className="hero">
        <video src={videoBg} autoPlay loop muted className="hero-video"></video>
        <Box className="hero-text">Welcome to Menu! </Box>
      </Box>

      {/* Categories Section */}
      <Box className="category-container">
        <Typography variant="h5" className="section-title">
          Categories
        </Typography>
        <Box
          className="category-buttons"
          sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 2 }}
        >
          {categories.map((category, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <Box
                component="div"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  cursor: "pointer",
                }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="category-image"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Trending Dishes Section */}
      <Box className="food-container" sx={{ mt: 5 }}>
        <Typography variant="h5" className="section-title">
          Trending Dishes 🔥
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center", mt: 2 }}>
          {trendingDishes.length > 0 ? (
            trendingDishes.map((dish, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="food-card">
                  <CardMedia
                    component="img"
                    image={dish.image}
                    alt={dish.name}
                    className="food-image"
                    style={{ height: 140 }}
                  />
                  <CardContent>
                    <Typography variant="h6">{dish.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      ₹{dish.price}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    className="order-button"
                    sx={{ m: 1 }}
                    onClick={() => handleAddToCart(dish)} // ✅ Add to cart
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ textAlign: "center", mt: 3 }}>
              No trending dishes found! 😔
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        className="footer"
        sx={{ textAlign: "center", py: 3, backgroundColor: "#f8f8f8", mt: 5 }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 Royal Feast. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Mccategories;
