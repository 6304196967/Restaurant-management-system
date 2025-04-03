import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
const CustomerCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);
// ✅ Show Alert if Cart is Empty
useEffect(() => {
  if (!loading && cartItems.length === 0) {
    Swal.fire({
      title: "Your Cart is Empty! 🛒",
      text: "Would you like to explore the menu or go back to home?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Go to Menu 🍔",
      cancelButtonText: "Back to Home 🏡",
      confirmButtonColor: "#3498db",
      cancelButtonColor: "#2ecc71",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/customer/mcategories";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/customer/home";
      }
    });
  }
}, [cartItems, loading]);

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
        `https://restaurant-management-backend-1.onrender.com/api/cart/cartitems?email=${email}`
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

    await fetch("https://restaurant-management-backend-1.onrender.com/api/cart/updatecart", {
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
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/cart/removecart", {
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
      Swal.fire("Error", "Error removing item. Please try again.", "error");
      console.error(err);
    }
  };

  // ✅ Handle Buy Now with SweetAlert
  // ✅ Enhanced Handle Buy Now with SweetAlert
const handleBuyNow = async () => {
  const { value: formValues } = await Swal.fire({
    title: '<span style="color: #2c3e50; font-size: 1.5rem">Shipping Details</span> 📦',
    html: `
      <div style="text-align: left; max-height: 40vh; overflow-y: auto; padding-right: 10px;">
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">First Name*</label>
          <input id="swal-firstName" class="swal2-input enhanced-input" placeholder="John" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Last Name*</label>
          <input id="swal-lastName" class="swal2-input enhanced-input" placeholder="Doe" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Phone Number*</label>
          <input id="swal-phoneNumber" class="swal2-input enhanced-input" placeholder="9876543210" type="tel" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Alternate Phone</label>
          <input id="swal-altPhoneNumber" class="swal2-input enhanced-input" placeholder="(Optional)" type="tel">
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">House/Flat No.*</label>
          <input id="swal-houseNo" class="swal2-input enhanced-input" placeholder="123" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Street/Locality*</label>
          <input id="swal-street" class="swal2-input enhanced-input" placeholder="Main Street" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Landmark</label>
          <input id="swal-landmark" class="swal2-input enhanced-input" placeholder="(Optional)">
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">District*</label>
          <input id="swal-district" class="swal2-input enhanced-input" placeholder="Central District" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Mandal*</label>
          <input id="swal-mandal" class="swal2-input enhanced-input" placeholder="Downtown" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Pincode*</label>
          <input id="swal-pincode" class="swal2-input enhanced-input" placeholder="500001" type="number" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">State*</label>
          <input id="swal-state" class="swal2-input enhanced-input" placeholder="Telangana" required>
        </div>
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: 500;">Payment Method*</label>
          <select id="swal-paymentMode" class="swal2-input enhanced-input" style="padding: 10px 14px;">
            <option value="Cash">Cash on Delivery</option>
            <option value="Online" disabled>Online Payment (Coming Soon)</option>
          </select>
        </div>
      </div>
    `,
    width: '400px',
    background: '#ffffff',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Place Order',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#f44336',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const firstName = document.getElementById('swal-firstName').value;
      const lastName = document.getElementById('swal-lastName').value;
      const phoneNumber = document.getElementById('swal-phoneNumber').value;
      const houseNo = document.getElementById('swal-houseNo').value;
      const street = document.getElementById('swal-street').value;
      const district = document.getElementById('swal-district').value;
      const mandal = document.getElementById('swal-mandal').value;
      const pincode = document.getElementById('swal-pincode').value;
      const state = document.getElementById('swal-state').value;

      // Validate required fields
      if (!firstName || !lastName || !phoneNumber || !houseNo || !street || 
          !district || !mandal || !pincode || !state) {
        Swal.showValidationMessage('Please fill in all required fields');
        return false;
      }

      // Validate phone number format
      if (!/^\d{10}$/.test(phoneNumber)) {
        Swal.showValidationMessage('Please enter a valid 10-digit phone number');
        return false;
      }

      // Validate pincode format
      if (!/^\d{6}$/.test(pincode)) {
        Swal.showValidationMessage('Please enter a valid 6-digit pincode');
        return false;
      }

      return {
        firstName,
        lastName,
        phoneNumber,
        altPhoneNumber: document.getElementById('swal-altPhoneNumber').value,
        houseNo,
        street,
        landmark: document.getElementById('swal-landmark').value,
        district,
        mandal,
        pincode,
        state,
        paymentMode: document.getElementById('swal-paymentMode').value,
      };
    },
    allowOutsideClick: () => !Swal.isLoading(),
    customClass: {
      container: 'enhanced-swal-container',
      popup: 'enhanced-swal-popup',
      header: 'enhanced-swal-header',
      title: 'enhanced-swal-title',
      closeButton: 'enhanced-swal-close',
      content: 'enhanced-swal-content',
      input: 'enhanced-swal-input',
      validationMessage: 'enhanced-swal-validation',
      actions: 'enhanced-swal-actions',
      confirmButton: 'enhanced-swal-confirm',
      cancelButton: 'enhanced-swal-cancel',
    }
  });

  if (formValues) {
    await placeOrder(formValues);
  }
};
  // ✅ Place Order After Filling SweetAlert Form
  const placeOrder = async (formValues) => {
    const email = localStorage.getItem("email");

    if (!email || cartItems.length === 0) {
      Swal.fire("Error", "Cart is empty or user not logged in.", "error");
      return;
    }

    // ✅ Sanitize Items
    const sanitizedItems = cartItems.map(({ _id, ...item }) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
    }));

    try {
      const orderResponse = await fetch("https://restaurant-management-backend-1.onrender.com/api/order/additem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: sanitizedItems,
          totalPrice,
          customerDetails: { ...formValues },
          paymentMode: formValues.paymentMode,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to place order.");
      }

      // ✅ Clear Cart After Order
      await fetch("https://restaurant-management-backend-1.onrender.com/api/cart/removecart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      Swal.fire("Success!", "Order placed successfully 🎉", "success");
      setCartItems([]);
      setTotalPrice(0);
    } catch (err) {
      Swal.fire("Error", "Error placing order or clearing cart. Please try again.", "error");
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

      {/* ✅ Buy Now Button with SweetAlert Trigger */}
      {cartItems.length > 0 && (
        <button
          style={styles.placeOrderBtn}
          onClick={handleBuyNow}
          disabled={orderPlaced || cartItems.length === 0}
        >
          {orderPlaced ? "Order Placed ✅" : "Buy Now 🛒"}
        </button>
      )}
    </div>
  );
};

const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "#f5f7fa",
    minHeight: "100vh",
  },
  cartTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    margin: "20px 0",
    color: "#2c3e50",
  },
  emptyCart: {
    fontSize: "1.5rem",
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: "50px",
  },
  cartItems: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "25px",
  },
  cartItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  cartItemImage: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
  },
  cartItemDetails: {
    flex: 1,
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  qtyBtn: {
    padding: "8px 12px",
    backgroundColor: "#e0e0e0",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  qtyValue: {
    fontSize: "1rem",
  },
  removeBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  placeOrderBtn: {
    marginTop: "30px",
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.2rem",
    width: "100%",
  },
};

export default CustomerCart;
