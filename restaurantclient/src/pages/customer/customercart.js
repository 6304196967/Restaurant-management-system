import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ✅ Fetch Cart Items using Params
  const fetchCartItems = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      setError("No email found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/cartitems?email=${email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items!!");
      }

      const data = await response.json();

      if (data.cart && data.cart.items) {
        setCartItems(data.cart.items);
        calculateTotalPrice(data.cart.items);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (err) {
      setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate Total Price Dynamically
  const calculateTotalPrice = (items) => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotal);
  };

  // ✅ Handle Increase Quantity (Frontend Only)
  const handleIncreaseQuantity = (item) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  // ✅ Handle Decrease Quantity (Frontend Only)
  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) return;

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  // ✅ Remove Item using Params
  const handleRemoveItem = async (itemName) => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/removeitem?email=${email}&name=${itemName}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item.");
      }

      const updatedItems = cartItems.filter((item) => item.name !== itemName);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (err) {
      alert("Error removing item.");
      console.error(err);
    }
  };

  // ✅ Handle Place Order using Params
  const handlePlaceOrder = async () => {
    const email = localStorage.getItem("email");

    if (!email || cartItems.length === 0) {
      alert("Cart is empty or user not logged in.");
      return;
    }

    try {
      const orderResponse = await fetch(
        "http://localhost:3000/api/order/additem", // ✅ Correct URL (No query params for POST)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // ✅ Send email inside the body
            items: cartItems, // ✅ Updated quantities in order schema
            totalPrice: totalPrice,
          }),
        }
      );
      

      if (!orderResponse.ok) {
        throw new Error("Failed to place order.");
      }

      alert("Order placed successfully! 🎉");

      // ✅ Clear Cart API Call using Params
      const clearCartResponse = await fetch(
        `http://localhost:3000/api/cart/removecart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // ✅ Only email is required to clear the cart
        }
      );
      

      if (!clearCartResponse.ok) {
        throw new Error("Failed to clear cart after order.");
      }

      setOrderPlaced(true);
      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      alert("Error placing order or clearing cart. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={styles.cartContainer}>
      <Navbar />
      <h1 style={styles.cartTitle}>Customer Cart 🛒</h1>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCart}>Your cart is empty.</p>
      ) : (
        <div style={styles.cartItems}>
          {cartItems.map((item, index) => (
            <div key={index} style={styles.cartItem}>
              {/* ✅ Display the item image */}
              <img
                src={item.image}
                alt={item.name}
                style={styles.cartItemImage}
              />
              <div style={styles.cartItemDetails}>
                <strong>{item.name}</strong> <br />
                Price: ₹{item.price} <br />
                <div style={styles.quantityControls}>
                  {/* ➕ Increase and ➖ Decrease Buttons */}
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    style={styles.qtyBtn}
                  >
                    ➖
                  </button>
                  <span style={styles.qtyValue}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    style={styles.qtyBtn}
                  >
                    ➕
                  </button>
                </div>
                <strong>Total: ₹{item.price * item.quantity}</strong>
              </div>
              {/* ❌ Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.name)}
                style={styles.removeBtn}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          {/* ✅ Display total price */}
          <div style={styles.cartTotal}>
            <h2>Total Price: ₹{totalPrice}</h2>
          </div>

          {/* ✅ Place Order Button */}
          <button
            style={styles.placeOrderBtn}
            onClick={handlePlaceOrder}
            disabled={orderPlaced}
          >
            {orderPlaced ? "Order Placed ✅" : "Place Order 🛒"}
          </button>
        </div>
      )}
    </div>
  );
};

// 🎨 Inline CSS styles
const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  },
  cartTitle: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  emptyCart: {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
    marginTop: "50px",
  },
  cartItems: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    justifyContent: "center",
    marginTop: "20px",
  },
  cartItem: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  cartItemImage: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
  },
  cartItemDetails: {
    fontSize: "1rem",
    color: "#333",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
  },
  qtyBtn: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
  qtyValue: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  cartTotal: {
    marginTop: "20px",
    textAlign: "right",
    padding: "10px",
    borderTop: "2px solid #ddd",
  },
  placeOrderBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default CustomerCart;
