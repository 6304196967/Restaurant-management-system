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
import Swal from "sweetalert2";
import videoBg from "../../assets/food-video.webm";
import Navbar from "./navbarcustomer.js";

// ✅ Define categories with correct images
const categories = [
  { name: "Burger", img: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_640.jpg" },
  { name: "Pizza", img: "https://cdn.pixabay.com/photo/2017/01/22/19/20/pizza-2000615_640.jpg" },
  { name: "Biryani", img: "https://th.bing.com/th/id/OIP.xrIs5Skr4mPMOVMNoj70nAHaFj?w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "icecream", img: "https://th.bing.com/th/id/OIP.imiAt4k41HAzdEjIWkpaYgHaEw?w=312&h=200&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Pasta", img: "https://th.bing.com/th/id/OIP.RwG17bros5shJNe1ZQ9LOAHaJ4?w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Desserts", img: "https://th.bing.com/th/id/OIP.8FNfrOp6PoTS41no5ReAWgHaJQ?w=223&h=279&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Drinks", img: "https://th.bing.com/th/id/OIP.HDSdTrfcqOYYOhZLiHyagQHaFw?w=283&h=220&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Shawarma", img: "https://th.bing.com/th/id/OIP.MQ-mvnxUoPrGfmOEXcdLmwHaF7?w=279&h=223&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Starters", img: "https://www.bing.com/th/id/OIP.H4Lab9Knu-DZIGDj2Um0-wHaFe?w=140&h=103&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  { name: "Curries", img: "https://th.bing.com/th/id/OIP.qPkNRPChXAkWrIB2TqokLwHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.8&pid=3.1&rm=2" },
  {name: "Salads",img: "https://www.bing.com/th/id/OIP.-O7-Mg1YlRocsaM5ZFZdAgHaLH?w=198&h=297&c=7&r=0&o=5&dpr=1.8&pid=1.7",  },
  {name: "Sandwiches",img: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_640.jpg",    },
  {name: "Sushi",img: "https://th.bing.com/th/id/OIP.oVBwKKjIAekd_UuP91UlUwHaE8?w=213&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7", },
  {name: "Tacos",img: "https://th.bing.com/th/id/OIP.9CmGxCCDge7NsFmIP5pS_wHaE8?w=286&h=190&c=7&r=0&o=5&dpr=1.8&pid=1.7",},
  {name: "Noodles",img: "https://th.bing.com/th/id/OIP.uNBi4LfKxpfYF5QjONnvLQHaLH?w=198&h=297&c=7&r=0&o=5&dpr=1.8&pid=1.7"},
  {name: "Mutton",img: "https://th.bing.com/th/id/OIP.b92cC7saJ5dEuiw9obW_SwHaE8?w=277&h=184&c=7&r=0&o=5&dpr=1.8&pid=1.7",},
  {name: "Seafood",img: "https://th.bing.com/th/id/OIP.VwZQHpwDq3VasWxm1rN_2AHaLH?w=127&h=191&c=7&r=0&o=5&dpr=1.8&pid=1.7",},
  {name: "Soup",img: "https://th.bing.com/th/id/OIP.CW_b8inwBIIaFO5idzcorgHaLH?w=198&h=363&c=7&r=0&o=5&dpr=1.8&pid=1.7", },
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
        Swal.fire({
          title: "Error! ❌",
          text: "Failed to load trending dishes. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
          confirmButtonColor: "#e74c3c",
        });
      }
    };

    fetchTrendingDishes();
  }, []);

  // ✅ Store category in localStorage and navigate to menu
  const handleCategoryClick = (categoryName) => {
    localStorage.setItem("selectedCategory", categoryName);
    navigate("/customer/menu");
  };

  // ✅ Add to Cart Function with SweetAlert
  const handleAddToCart = async (item) => {
    if (!userEmail) {
      Swal.fire({
        title: "Error! ❌",
        text: "User email not found. Please log in to continue.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#e74c3c",
      });
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

      Swal.fire({
        title: "Success! 🎉",
        text: `${item.name} added to cart! 🛒`,
        icon: "success",
        confirmButtonText: "Awesome!",
        confirmButtonColor: "#4CAF50",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: "Error! ❌",
        text: error.message || "Failed to add item to cart.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e74c3c",
      });
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
                    onClick={() => handleAddToCart(dish)} // ✅ Add to cart with Swal
                  >
                    Add to Cart 🛒
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
