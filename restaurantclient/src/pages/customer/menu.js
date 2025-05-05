import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
import "../../styles/menuPage.css";
import LoadingSpinner from "./RoyalFeastLoader.jsx";
import {
  Grid,
  Card,
  
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import {
  
  ShoppingCart,
  
} from "@mui/icons-material";
import ReviewsIcon from '@mui/icons-material/Reviews';
import CommentIcon from '@mui/icons-material/Comment';

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("email");
  const selectedCategory = localStorage.getItem("selectedCategory");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          `https://restaurant-management-backend-1.onrender.com/api/menu/allitems/${encodeURIComponent(
            selectedCategory
          )}`
        );
        if (!response.ok) throw new Error("Failed to fetch menu items");
        const data = await response.json();

        const itemsWithRatings = await Promise.all(
          data.map(async (item) => {
            const res = await fetch(
              `https://restaurant-management-backend-1.onrender.com/api/feedback/item/${encodeURIComponent(item.name)}`
            );

            if (res.ok) {
              const result = await res.json();
              return { ...item, averageRating: result.averageRating || 0 };
            } else {
              return { ...item, averageRating: 0 };
            }
          })
        );

        setMenuItems(itemsWithRatings);
      } catch (error) {
        setError(error.message);
        Swal.fire({
          title: "Error! ❌",
          text: error.message || "Failed to load menu items.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#e74c3c",
        }).then(() => {
          navigate("/customer/mcategories");
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
        navigate("/customer/mcategories");
      });
    }
    
  }, [menuItems, loading, navigate]);

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
          quantity: 1,
          image: item.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

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

  const handleViewReviews = async (itemName) => {
    try {
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/feedback/item/${encodeURIComponent(itemName)}`
      );

      if (!response.ok) throw new Error("Failed to fetch feedbacks");

      const { reviews, averageRating } = await response.json();

      const feedbackHtml = reviews.length
  ? reviews
      .map(
        (fb) =>
          `<p><strong>${fb.username || "Anonymous"}</strong>: ⭐${fb.rating}/5<br/>"${fb.feedback}"</p><hr/>`
      )
      .join("")
  : "<p>No reviews yet! Be the first to add some love ❤️</p>";


      Swal.fire({
        title: `${itemName} - Reviews ⭐${averageRating}/5`,
        html: feedbackHtml,
        width: 600,
        confirmButtonText: "Close",
        confirmButtonColor: "#3498db",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Could not load reviews",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
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

  return (
    <div className="homepage-container1">
      <Navbar />
      <h2 style={styles.menuTitle}>
        {selectedCategory
          ? `${selectedCategory.toUpperCase()} Menu 🍔🍕`
          : "Our Menu 🍔🍕"}
      </h2>
      <Grid container spacing={3}>
        {menuItems.map((dish, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="food-card animated-card">
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
                <Rating
                  value={dish.averageRating}
                  precision={0.5}
                  readOnly
                  style={{ marginTop: "8px" }}
                />
              </CardContent>
              <Button
                className="order-button"
                onClick={() => handleAddToCart(dish)}
              >
                Add to Cart <ShoppingCart />
              </Button>
              <Button
                className="order-button"
                style={{
                  backgroundColor: "#f39c12",
                  color: "#fff",
                  marginTop: "8px",
                }}
                onClick={() => handleViewReviews(dish.name)}
              >
                Reviews <CommentIcon />
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

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
