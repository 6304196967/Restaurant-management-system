import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
import "../../styles/menuPage.css";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

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
          `https://restaurant-management-backend-1.onrender.com/api/menu/allitems/${encodeURIComponent(
            selectedCategory
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
        Swal.fire({
          title: "Error! ❌",
          text: error.message || "Failed to load menu items.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#e74c3c",
        }).then(() => {
          navigate("/Restaurant-management-system/customer/mcategories"); // Redirect to categories if error
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory, navigate]);

  useEffect(() => {
    if (!loading && menuItems.length === 0) {
      Swal.fire({
        title: "No Items Found! 😔",
        text: `Sorry, no items available for ${selectedCategory}.`,
        icon: "info",
        confirmButtonText: "Go Back",
        confirmButtonColor: "#3498db",
      }).then(() => {
        navigate("Restaurant-management-system/customer/mcategories");
      });
    }
  }, [menuItems, loading, navigate]);

  if (loading) {
    return (
      <p style={styles.loading}>
        🍔 Loading menu... Please wait a moment! 🍕
      </p>
    );
  }
  if (error) {
    return (
      <p style={styles.error}>
        ❌ Error: {error} <br />
        Please try again.
      </p>
    );
  }

  // ✅ Function to handle adding an item to the cart
  const handleAddToCart = async (item) => {
    if (!userEmail) {
      Swal.fire({
        title: "Error! ❌",
        text: "User email not found. Please log in.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#e74c3c",
      });
      return;
    }

    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/cart/additem", {
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
      Swal.fire({
        title: "Error! ❌",
        text: error.message || "Failed to add item to cart",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  return (
    <div className="homepage-container">
      <Navbar />
      <div>
        <h2 style={styles.menuTitle}>
          {selectedCategory
            ? `${selectedCategory.toUpperCase()} Menu 🍔🍕`
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
                    Add to Cart 🛒
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              No items found for {selectedCategory.toUpperCase()} 😔
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
    textAlign: "center",
    marginTop: "50px",
  },
  error: {
    fontSize: "1.5rem",
    color: "#dc3545",
    textAlign: "center",
    marginTop: "50px",
  },
  menuTitle: {
    fontSize: "2rem",
    textAlign: "center",
    margin: "20px 0",
    color: "#2c3e50",
  },
};
