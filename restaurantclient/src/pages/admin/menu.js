import React, { useEffect, useState } from "react";
import "../../styles/categories.css"; // ✅ CSS file for styling
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import videoBg from "../../assets/food-video.webm";
import Navbar from "./navbaradmin.js";

const Mccategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading State
  const [error, setError] = useState(null); // ✅ Error State

  // ✅ Fetch Categories from Backend
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/category/getcategories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add New Category
  const handleAddCategory = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Category ➕",
      html: `
        <input id="swal-category-name" class="swal2-input" placeholder="Category Name" />
        <input id="swal-category-image" class="swal2-input" placeholder="Image URL" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Add Category ✅",
      cancelButtonText: "Cancel ❌",
      preConfirm: () => {
        const name = document.getElementById("swal-category-name").value;
        const img = document.getElementById("swal-category-image").value;

        if (!name || !img) {
          Swal.showValidationMessage("Please enter both name and image URL.");
        }
        return { name, img };
      },
    });

    if (formValues) {
      try {
        const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/category/addcategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (!response.ok) throw new Error("Failed to add category");

        // ✅ Refresh Categories after Adding
        fetchCategories();
        Swal.fire({
          title: "Success! 🎉",
          text: `${formValues.name} added successfully!`,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error adding category:", error);
        Swal.fire({
          title: "Error! ❌",
          text: "Failed to add category. Please try again.",
          icon: "error",
        });
      }
    }
  };

  // ✅ Remove Category
  const handleRemoveCategory = async (categoryName) => {
    Swal.fire({
      title: `Are you sure? ❗`,
      text: `Do you want to remove ${categoryName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove It!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e74c3c",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://restaurant-management-backend-1.onrender.com/api/category/deletecategory/${categoryName}`, {
            method: "DELETE",
          });

          if (!response.ok) throw new Error("Failed to delete category");

          // ✅ Refresh Categories after Deleting
          fetchCategories();
          Swal.fire("Deleted!", `${categoryName} has been removed.`, "success");
        } catch (error) {
          console.error("Error removing category:", error);
          Swal.fire({
            title: "Error! ❌",
            text: "Failed to remove category. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  // ✅ Store category in localStorage and navigate to menu
  const handleCategoryClick = (categoryName) => {
    localStorage.setItem("selectedCategory", categoryName);
    navigate("/admin/menu");
  };

  return (
    <div className="homepage-container">
      <Navbar />
      {/* Hero Section */}
      <Box className="hero1">
        <video src={videoBg} autoPlay loop muted className="hero-video1"></video>
        <Box className="hero-text1">Welcome to Admin Panel!</Box>
      </Box>

      {/* Categories Section */}
      <Box className="category-container">
        <Typography variant="h5" className="section-title">
          Manage Categories 
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <CircularProgress size={50} />
          </Box>
        ) : error ? (
          <Typography variant="body1" color="error" sx={{ textAlign: "center", mt: 3 }}>
            {error}
          </Typography>
        ) : (
          <Box
            className="category-buttons"
            sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 2, flexWrap: "wrap" }}
          >
            {/* ✅ Render Existing Categories */}
            {categories.map((category, index) => (
              <Box key={index} sx={{ textAlign: "center", position: "relative" }}>
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
                    position: "relative",
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
                {/* ✅ Delete Icon */}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    minWidth: "30px",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                  onClick={() => handleRemoveCategory(category.name)}
                >
                  ❌
                </Button>
              </Box>
            ))}

                        <Box
                          sx={{
                            width: 120,
                            height: 120,
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            margin: "auto",
                            textAlign: "center",
                            mt: 1,
                            border: "2px dashed #ccc",
                            flexDirection: "column", // Align text below the "+" symbol
                          }}
                          onClick={handleAddCategory}
                        >
                          <Typography variant="h4" sx={{ color: "#4CAF50" }}>
                            +
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                            Add New
                          </Typography>
                        </Box>
                      </Box>
                    )}
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
