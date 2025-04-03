import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

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
        window.location.href = "/Restaurant-management-system/customer/mcategories";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "/Restaurant-management-system/customer/home";
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
  const cartItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { opacity: 0, x: -50 }
  };

  const checkoutButtonVariants = {
    rest: { 
      scale: 1,
      boxShadow: "0 4px 15px rgba(255, 82, 0, 0.3)"
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 6px 20px rgba(255, 82, 0, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 2px 10px rgba(255, 82, 0, 0.2)"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0 rgba(255, 117, 51, 0.4)",
      "0 0 0 10px rgba(255, 117, 51, 0)",
      "0 0 0 0 rgba(255, 117, 51, 0)"
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="cart-container">
      <Navbar />
      
      <div className="cart-content">
        <motion.h1 
          className="cart-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
          <motion.div 
            className="title-decoration"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            className="empty-cart-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="empty-cart-icon"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2 
              }}
            >
              🛒
            </motion.div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <div className="empty-cart-actions">
              <motion.a 
                href="/customer/mcategories" 
                className="btn-primary"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 6px 12px rgba(255, 82, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Browse Menu
              </motion.a>
              <motion.a 
                href="/customer/home" 
                className="btn-secondary"
                whileHover={{ 
                  y: -2,
                  boxShadow: "0 6px 12px rgba(255, 82, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Back to Home
              </motion.a>
            </div>
          </motion.div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items-section">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="cart-item-card"
                    variants={cartItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{ 
                      y: -3,
                      boxShadow: "0 8px 25px rgba(255, 117, 51, 0.15)"
                    }}
                  >
                    <div className="item-image-container">
                      <motion.img 
                        src={item.image} 
                        alt={item.name} 
                        className="item-image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-price">₹{item.price}</p>
                      
                      <div className="quantity-controls">
                        <motion.button 
                          className="quantity-btn decrease"
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.quantity <= 1}
                          whileHover={{ scale: item.quantity <= 1 ? 1 : 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          −
                        </motion.button>
                        <motion.span 
                          className="quantity-value"
                          key={item.quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          {item.quantity || 1}
                        </motion.span>
                        <motion.button 
                          className="quantity-btn increase"
                          onClick={() => handleIncreaseQuantity(item)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                      
                      <p className="item-total">Total: ₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    
                    <motion.button 
                      className="remove-item-btn"
                      onClick={() => handleRemoveItem(item.name)}
                      whileHover={{ 
                        scale: 1.1,
                        color: "#d04500"
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Remove
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              className="order-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <motion.span 
                    className="free-delivery"
                    animate={pulseAnimation}
                  >
                    Free
                  </motion.span>
                </div>
                <div className="summary-row">
                  <span>Taxes</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Order Total</span>
                  <span>₹{(totalPrice * 1.05).toFixed(2)}</span>
                </div>
              </div>
              
              <motion.button 
                className="checkout-btn"
                onClick={handleBuyNow}
                disabled={orderPlaced || cartItems.length === 0}
                variants={checkoutButtonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {orderPlaced ? (
                  <>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Order Confirmed!
                    </motion.span>
                    <motion.div 
                      className="confetti"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 15
                      }}
                    >
                      🎉
                    </motion.div>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <motion.div 
                      className="arrow-icon"
                      animate={{
                        x: [0, 5, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 1.5
                        }
                      }}
                    >
                      →
                    </motion.div>
                  </>
                )}
              </motion.button>
              
              <div className="continue-shopping">
                <motion.a 
                  href="/customer/mcategories"
                  whileHover={{ 
                    color: "#ff5200",
                    x: -3
                  }}
                >
                  <span className="arrow">←</span> Continue Shopping
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes confettiFall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <style jsx>{`
        .cart-container {
          min-height: 100vh;
          background-color: #ffdccc;
          padding-bottom: 50px;
          overflow-x: hidden;
        }
        
        .cart-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .cart-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ff5200;
          margin-bottom: 30px;
          text-align: center;
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
          width: 100%;
        }
        
        .title-decoration {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ff5200, #ff7533, #ff9766);
          transform-origin: left;
          border-radius: 2px;
        }
        
        .empty-cart-message {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(255, 117, 51, 0.15);
          max-width: 500px;
          margin: 0 auto;
          transform-style: preserve-3d;
        }
        
        .empty-cart-icon {
          font-size: 80px;
          margin-bottom: 20px;
          color: #ff7533;
          display: inline-block;
          filter: drop-shadow(0 4px 8px rgba(255, 117, 51, 0.3));
        }
        
        .empty-cart-message h2 {
          font-size: 28px;
          color: #ff5200;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .empty-cart-message p {
          color: #666;
          font-size: 16px;
          margin-bottom: 30px;
        }
        
        .empty-cart-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ff5200, #ff7533);
          color: white;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 82, 0, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: 0.5s;
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .btn-secondary {
          background: white;
          color: #ff5200;
          padding: 12px 25px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          border: 2px solid #ff5200;
          transition: all 0.3s;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(255, 82, 0, 0.1);
        }
        
        .btn-secondary:hover {
          background: #fff5f0;
        }
        
        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 30px;
        }
        
        .cart-items-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .cart-item-card {
          display: flex;
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 6px 20px rgba(255, 117, 51, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border-left: 5px solid #ff9766;
        }
        
        .cart-item-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,186,153,0.1) 0%, rgba(255,255,255,0) 100%);
          pointer-events: none;
        }
        
        .item-image-container {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
          margin-right: 20px;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #ffba99, #ff9766);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(255, 117, 51, 0.2);
          position: relative;
        }
        
        .item-image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%);
        }
        
        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .item-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        .item-name {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 8px 0;
          position: relative;
          display: inline-block;
        }
        
        .item-name::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ff5200;
          transition: width 0.3s ease;
        }
        
        .cart-item-card:hover .item-name::after {
          width: 100%;
        }
        
        .item-price {
          font-size: 16px;
          color: #ff5200;
          font-weight: 600;
          margin: 0 0 15px 0;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          gap: 10px;
        }
        
        .quantity-btn {
          width: 36px;
          height: 36px;
          border: none;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
          font-weight: bold;
          position: relative;
          overflow: hidden;
        }
        
        .quantity-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
        }
        
        .quantity-btn.decrease {
          background: linear-gradient(135deg, #ff9766, #ff7533);
          color: white;
        }
        
        .quantity-btn.increase {
          background: linear-gradient(135deg, #ff7533, #ff5200);
          color: white;
        }
        
        .quantity-value {
          width: 40px;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #ff5200;
        }
        
        .item-total {
          font-size: 17px;
          font-weight: 700;
          color: #ff5200;
          margin: 0;
        }
        
        .remove-item-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #ff5200;
          font-size: 14px;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          border-radius: 4px;
        }
        
        .remove-item-btn svg {
          transition: transform 0.3s ease;
        }
        
        .remove-item-btn:hover svg {
          transform: rotate(90deg);
        }
        
        .order-summary {
          background: white;
          border-radius: 16px;
          padding: 30px;
          height: fit-content;
          box-shadow: 0 8px 25px rgba(255, 117, 51, 0.1);
          position: sticky;
          top: 20px;
          border-top: 5px solid #ff7533;
          transform-style: preserve-3d;
        }
        
        .order-summary::before {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: -10px;
          background: rgba(255, 117, 51, 0.1);
          border-radius: 16px;
          z-index: -1;
          transform: translateZ(-10px);
        }
        
        .summary-title {
          font-size: 22px;
          font-weight: 700;
          color: #ff5200;
          margin-top: 0;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px dashed #ffba99;
          text-align: center;
        }
        
        .summary-details {
          margin-bottom: 25px;
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          font-size: 16px;
          color: #555;
        }
        
        .summary-row.total-row {
          font-weight: 700;
          font-size: 18px;
          color: #ff5200;
          margin-top: 20px;
        }
        
        .free-delivery {
          background: #ffba99;
          color: white;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .summary-divider {
          height: 2px;
          background: linear-gradient(90deg, #ffba99, #ff9766, #ffba99);
          margin: 20px 0;
          border: none;
          opacity: 0.6;
        }
        
        .checkout-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #ff5200, #ff7533);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .checkout-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ff7533, #ff5200);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .checkout-btn:hover::before {
          opacity: 1;
        }
        
        .checkout-btn:disabled {
          background: #ffba99;
          cursor: not-allowed;
        }
        
        .arrow-icon {
          display: inline-block;
        }
        
        .confetti {
          position: absolute;
          font-size: 24px;
          right: 20px;
        }
        
        .continue-shopping {
          text-align: center;
        }
        
        .continue-shopping a {
          color: #ff7533;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        
        .continue-shopping a:hover {
          color: #ff5200;
        }
        
        .arrow {
          transition: transform 0.3s ease;
        }
        
        .continue-shopping a:hover .arrow {
          transform: translateX(-5px);
        }
        
        @media (max-width: 768px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
          
          .order-summary {
            position: static;
            margin-top: 40px;
          }
          
          .cart-item-card {
            flex-direction: column;
          }
          
          .item-image-container {
            width: 100%;
            height: 200px;
            margin-right: 0;
            margin-bottom: 20px;
          }
          
          .empty-cart-actions {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerCart;