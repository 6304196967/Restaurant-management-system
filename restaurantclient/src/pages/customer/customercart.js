import React, { useEffect, useState } from "react";
import "../../styles/customercart.css"
const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // ✅ State for total price
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Get email from localStorage
      const email = localStorage.getItem("email");

      if (!email) {
        setError("No email found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        // Send email as a query parameter in GET request
        const response = await fetch(
          `http://localhost:3000/api/cart/cartitems?email=${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items!!");
        }

        const data = await response.json();

        // Check if cart data exists
        if (data.cart && data.cart.items) {
          setCartItems(data.cart.items);
          setTotalPrice(data.cart.totalPrice || 0); // ✅ Fetch total price
        } else {
          setCartItems([]); // Empty cart
          setTotalPrice(0);
        }
      } catch (err) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Customer Cart 🛒</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              {/* ✅ Display the item image */}
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <strong>{item.name}</strong> <br />
                Quantity: {item.quantity} <br />
                Price: ₹{item.price} <br />
                <strong>Total: ₹{item.price * item.quantity}</strong>
              </div>
            </div>
          ))}
          {/* ✅ Display total price at the bottom */}
          <div className="cart-total">
            <h2>Total Price: ₹{totalPrice}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCart;
