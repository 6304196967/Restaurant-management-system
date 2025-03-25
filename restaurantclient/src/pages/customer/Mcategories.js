import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Box,
  Container,
  Link,
} from "@mui/material";
import { Search, Person, ShoppingCart } from "@mui/icons-material";

import videoBg from "../../assets/food-video.webm";
import biryaniImg from "../../assets/biryani.webp";
import pizzaImg from "../../assets/biryani.webp";
import burgerImg from "../../assets/biryani.webp";
import iceCreamImg from "../../assets/biryani.webp";
import "../../styles/categories.css"
import Navbar from "./navbarcustomer.js";


const categories = [
  { name: "Burger", img: burgerImg },
  { name: "Pizza", img: pizzaImg },
  { name: "Biryani", img: biryaniImg },
  { name: "Ice Cream", img: iceCreamImg },
];

const dishes = [
  { name: "Cheese Burger", img: burgerImg, category: "Burger" },
  { name: "Pepperoni Pizza", img: pizzaImg, category: "Pizza" },
  { name: "Chicken Biryani", img: biryaniImg, category: "Biryani" },
  { name: "Chocolate Ice Cream", img: iceCreamImg, category: "Ice Cream" },
];

const Mcategories = () => {
  return (
    <div className="homepage-container">
      <Navbar />

      <Box className="hero">
        <video src={videoBg} autoPlay loop muted className="hero-video"></video>
        <Box className="hero-text">Welcome to Menu!</Box>
      </Box>

      <Box className="category-container">
        <Typography variant="h5" className="section-title">Categories</Typography>
        <Box className="category-buttons" sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 2 }}>
          {categories.map((category, index) => (
            <Box key={index} sx={{ textAlign: "center" }}>
              <Box
                component="a"
                href="#menu"
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
              >
                <img src={category.img} alt={category.name} className="category-image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>{category.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="food-container">
        <Typography variant="h5" className="section-title">Trending Dishes</Typography>
        <Grid container spacing={3} className="MuiGrid-container">
          {dishes.map((dish, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="food-card">
                <CardMedia component="img" image={dish.img} alt={dish.name} className="food-image" />
                <CardContent>
                  <Typography variant="h6">{dish.name}</Typography>
                  <Typography variant="body1" className="food-price">₹299</Typography>
                </CardContent>
                <Button className="order-button">Add to Cart</Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className="footer" sx={{ textAlign: "center", py: 3, backgroundColor: "#fff" }}>
        <Typography variant="body2" color="textSecondary">© 2025 Royal Feast. All rights reserved.</Typography>
        <Box className="footer-links" sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
          <Link href="#" color="inherit">Privacy Policy</Link>
          <Link href="#" color="inherit">Terms of Service</Link>
          <Link href="#" color="inherit">Contact Us</Link>
        </Box>
      </Box>
    </div>
  );
};

export default Mcategories;