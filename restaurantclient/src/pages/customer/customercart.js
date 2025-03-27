import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";

const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 📝 Address Form Data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");

  useEffect(() => {
    fetchCartItems();
  }, []);

  // ✅ Fetch Cart Items
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
        throw new Error("Failed to fetch cart items!");
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

  // ✅ Calculate Total Price
  const calculateTotalPrice = (items) => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(newTotal);
  };

  // ✅ Update Cart in Backend
  const updateCartItem = async (item, quantity) => {
    const email = localStorage.getItem("email");

    await fetch("http://localhost:3000/api/cart/updatecart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: item.name, quantity }),
    });
  };

  // ✅ Increase Quantity
  const handleIncreaseQuantity = (item) => {
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
        : cartItem
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    updateCartItem(item, (item.quantity || 1) + 1);
  };

  // ✅ Decrease Quantity
  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) return;

    const updatedItems = cartItems.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    updateCartItem(item, item.quantity - 1);
  };

  // ✅ Remove Item
  const handleRemoveItem = async (itemName) => {
    const email = localStorage.getItem("email");

    try {
      const response = await fetch("http://localhost:3000/api/cart/removecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: itemName }),
      });

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

  // ✅ Place Order with Address
  const handlePlaceOrder = async () => {
    const email = localStorage.getItem("email");

    if (!email || cartItems.length === 0) {
      alert("Cart is empty or user not logged in.");
      return;
    }

    // ✅ Sanitize Items
    const sanitizedItems = cartItems.map(({ _id, ...item }) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
    }));

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !houseNo ||
      !street ||
      !district ||
      !mandal ||
      !pincode ||
      !state ||
      !paymentMode
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const orderResponse = await fetch(
        "http://localhost:3000/api/order/additem",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            items: sanitizedItems,
            totalPrice,
            customerDetails: {
              firstName,
              lastName,
              phoneNumber,
              altPhoneNumber,
              houseNo,
              street,
              landmark,
              district,
              mandal,
              pincode: String(pincode),
              state,
            },
            paymentMode,
          }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to place order.");
      }

      // ✅ Clear Cart After Order
      await fetch("http://localhost:3000/api/cart/removecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      Swal.fire({
        title: "Success!",
        text: "Order placed successfully 🎉",
        icon: "success",
        confirmButtonText: "OK",
      });

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
              <img
                src={item.image}
                alt={item.name}
                style={styles.cartItemImage}
              />
              <div style={styles.cartItemDetails}>
                <strong>{item.name}</strong> <br />
                Price: ₹{item.price} <br />
                <div style={styles.quantityControls}>
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    style={styles.qtyBtn}
                  >
                    ➖
                  </button>
                  <span style={styles.qtyValue}>{item.quantity || 1}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    style={styles.qtyBtn}
                  >
                    ➕
                  </button>
                </div>
                <strong>Total: ₹{item.price * (item.quantity || 1)}</strong>
              </div>
              <button
                onClick={() => handleRemoveItem(item.name)}
                style={styles.removeBtn}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 📝 Shipping Details - Show Only If Cart Has Items */}
      {cartItems.length > 0 && (
        <div style={styles.orderForm}>
          <h3>Shipping Details 📦</h3>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Alternate Phone Number (Optional)"
            value={altPhoneNumber}
            onChange={(e) => setAltPhoneNumber(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="House/Flat No."
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Street/Locality"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Landmark (Optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Mandal"
            value={mandal}
            onChange={(e) => setMandal(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={styles.inputField}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={styles.inputField}
          />
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            style={styles.inputField}
          >
            <option value="Cash">Cash on Delivery</option>
            <option value="Online" disabled>Online Payment .. Will be coming soon</option>
          </select>

          <button
            style={styles.placeOrderBtn}
            onClick={handlePlaceOrder}
            disabled={orderPlaced || cartItems.length === 0}
          >
            {orderPlaced ? "Order Placed ✅" : "Place Order 🛒"}
          </button>
        </div>
      )}
    </div>
  );
};

// 🎨 CSS Styles
const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
  },
  cartTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "25px",
    color: "#333",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
  },
  emptyCart: {
    fontSize: "1.4rem",
    color: "#888",
    textAlign: "center",
    marginTop: "50px",
  },
  cartItems: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    padding: "0 10px",
  },
  cartItem: {
    backgroundColor: "#fff",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
  },
  cartItemImage: {
    width: "90px",
    height: "90px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "1px solid #ddd",
    transition: "transform 0.3s",
  },
  cartItemDetails: {
    flex: 1,
    fontSize: "1.1rem",
    color: "#444",
  },
  qtyBtn: {
    padding: "8px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  qtyValue: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0 10px",
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background-color 0.3s, transform 0.2s",
  },
  orderForm: {
    marginTop: "30px",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputField: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  placeOrderBtn: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "14px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s, transform 0.2s",
  },
};
export default CustomerCart;