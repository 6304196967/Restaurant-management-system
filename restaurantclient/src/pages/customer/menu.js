import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbarcustomer";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get email from localStorage
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/menu/allitems");
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
  }, []);

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
    <div style={styles.menuContainer}>
      <Navbar />
      <h2 style={styles.menuTitle}>Our Menu 🍔🍕</h2>
      <div style={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div style={styles.menuCard} key={item.id || index}>
            <img
              src={item.image}
              alt={item.name}
              style={styles.menuImage}
            />
            <h3 style={styles.menuName}>{item.name}</h3>
            <p style={styles.menuPrice}>₹{item.price}</p>
            <p style={styles.menuDescription}>{item.description}</p>

            {/* ✅ Add to Cart Button */}
            <button
              style={styles.addToCartBtn}
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎨 Updated Styles
const styles = {
  menuContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  menuTitle: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    justifyContent: "center",
  },
  menuCard: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
  },
  menuCardHover: {
    transform: "scale(1.05)",
  },
  menuImage: {
    width: "100%",
    height: "180px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  menuName: {
    fontSize: "1.5rem",
    margin: "10px 0",
    color: "#333",
  },
  menuPrice: {
    fontSize: "1.25rem",
    color: "#28a745",
    marginBottom: "5px",
  },
  menuDescription: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "10px",
  },
  addToCartBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  addToCartBtnHover: {
    backgroundColor: "#218838",
  },
  loading: {
    fontSize: "1.5rem",
    color: "#007bff",
  },
  error: {
    fontSize: "1.5rem",
    color: "#dc3545",
  },
};

