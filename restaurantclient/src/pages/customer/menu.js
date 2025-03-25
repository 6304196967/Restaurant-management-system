import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbarcustomer";
import "../../styles/menuPage.css";

import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Get email and selectedCategory from localStorage
  const userEmail = localStorage.getItem("email");
  const selectedCategory = localStorage.getItem("selectedCategory");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // ✅ Encode category before fetching
        const response = await fetch(
          `http://localhost:3000/api/menu/allitems/${encodeURIComponent(selectedCategory)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  if (loading) return <p style={styles.loading}>Loading menu...</p>;
  if (error) return <p style={styles.error}>Error: {error}</p>;

  // ✅ Function to handle adding an item to the cart
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
      setError(error.message);
    }
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div>
        <h2>
          {selectedCategory
            ? `${selectedCategory} Menu 🍔🍕`
            : "Our Menu 🍔🍕"}
        </h2>
        <Grid container spacing={3}>
          {menuItems.length > 0 ? (
            menuItems.map((dish, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="food-card">
                  <CardMedia
                    component="img"
                    image={dish.image}
                    alt={dish.name}
                    className="food-image"
                  />
                  <CardContent>
                    <Typography variant="h6">{dish.name}</Typography>
                    <Typography variant="body1" className="food-price">
                      ₹{dish.price}
                    </Typography>
                  </CardContent>
                  <Button
                    className="order-button"
                    onClick={() => handleAddToCart(dish)}
                  >
                    Add to Cart
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              No items found for {selectedCategory} 😔
            </Typography>
          )}
        </Grid>
      </div>
    </div>
  );
}

// 🎨 Updated Styles
const styles = {
  loading: {
    fontSize: "1.5rem",
    color: "#007bff",
  },
  error: {
    fontSize: "1.5rem",
    color: "#dc3545",
  },
};
