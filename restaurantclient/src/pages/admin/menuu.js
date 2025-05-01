import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbaradmin";
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
  const [menuItems, setMenuItems] = useState([]); // ✅ Default to empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Get selected category from localStorage
  const selectedCategory = localStorage.getItem("selectedCategory");

  // ✅ Fetch Menu Items
  // ✅ Fetch Menu Items
  // ✅ Fetch Menu Items (Now Defined Outside useEffect)
const fetchMenuItems = async () => {
    try {
      const categoryToFetch = selectedCategory
        ? encodeURIComponent(selectedCategory)
        : "all";
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/menu/allitems/${categoryToFetch}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
  
      const data = await response.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error.message);
      Swal.fire({
        title: "Error! ❌",
        text: error.message || "Failed to load menu items.",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: "#e74c3c",
      }).then(() => {
        navigate("/admin/mcategories");
      });
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
    fetchMenuItems(); // ✅ Fetch menu items on component mount
  }, [selectedCategory, navigate]);
  

  // ✅ Handle Remove Item
  const handleRemoveFromMenu = async (itemId) => {
    try {
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/menu/deleteitem/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from menu.");
      }

      Swal.fire({
        title: "Removed! ✅",
        text: "Item removed from the menu.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // ✅ Refresh after deleting
      setMenuItems((prevItems) =>
        (prevItems || []).filter((item) => item._id !== itemId)
      );
    } catch (error) {
      Swal.fire({
        title: "Error! ❌",
        text: error.message || "Failed to remove item.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  // ✅ Handle Add Item with SweetAlert
  // ✅ Handle Add Item with SweetAlert
const handleAddItem = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Item ➕",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Item Name" required />
        <input id="swal-image" type="url" class="swal2-input" placeholder="Image URL" required />
        <input id="swal-description" class="swal2-input" placeholder="Description" required />
        <input id="swal-price" type="number" min="1" class="swal2-input" placeholder="Price" required />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Item",
      confirmButtonColor: "#4CAF50",
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const image = document.getElementById("swal-image").value;
        const description = document.getElementById("swal-description").value;
        const price = document.getElementById("swal-price").value;
  
        if (!name || !image || !description || !price) {
          Swal.showValidationMessage(`All fields are required! ❗`);
          return false;
        }
  
        return { name, image, description, price };
      },
    });
  
    if (!formValues) {
      return;
    }
  
    // ✅ Add item with selectedCategory
    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/menu/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.name,
          image: formValues.image,
          description: formValues.description,
          price: parseFloat(formValues.price),
          type: selectedCategory, // ✅ Auto assign from localStorage
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item.");
      }
  
      // ✅ Show success message
      Swal.fire({
        title: "Success! 🎉",
        text: `${formValues.name} added to the menu.`,
        icon: "success",
        confirmButtonText: "Awesome!",
      });
  
      // ✅ Fetch updated menu after adding item
      await fetchMenuItems(); 
      
      // 💥 REFRESH HERE!
    } catch (error) {
      Swal.fire({
        title: "Error! ❌",
        text: error.message || "Failed to add item.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e74c3c",
      });
    }
  };
  

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading menu... Please wait! </p>
      </div>
    );
  }
  if (error) {
    return (
      <p className="error-text">
        ❌ Error: {error} <br />
        Please try again.
      </p>
    );
  }

  return (
    <div className="homepage-container">
      <Navbar />
      <div className="menu-container1">
        <h2 style={styles.menuTitle}>
          {selectedCategory
            ? `${selectedCategory.toUpperCase()} Menu `
            : "Our Menu "}
        </h2>
        <Grid container spacing={3} justifyContent="flex-start">
          {/* ✅ Menu Items Section */}
          {Array.isArray(menuItems) && menuItems.length > 0 ? (
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
                    onClick={() => handleRemoveFromMenu(dish._id)}
                  >
                    Remove from Menu ❌
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: "#e74c3c",
              }}
            >
              😔 No items found for this category. Add one now!
            </Typography>
          )}
          {/* ✅ Add New Item Card (Moved to End) */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="food-card" style={{ height: "100%" }}>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "275px",
                }}
              >
                <Typography variant="h6" className="menu-title">
                  Add New Item 🍲
                </Typography>
                <Button className="order-button" onClick={handleAddItem}>
                  Add Item ➕
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

// ✅ Styles
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
