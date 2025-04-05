import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "./navbaradmin";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const adminEmail = localStorage.getItem("email"); // 👈 Get email from localStorage
  
      const response = await fetch(`https://restaurant-management-backend-1.onrender.com/api/order/adminallorders?email=${adminEmail}`);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Fetched orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };
  
  
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/order/update/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      Swal.fire("Success!", `Order marked as ${newStatus}`, "success");
      fetchAllOrders();
    } catch (error) {
      Swal.fire("Error", "Could not update order", "error");
    }
  };

  const viewDetails = (order) => {
    Swal.fire({
      title: "Customer Details 🧾",
      html: `
        <p><strong>Name:</strong> ${order.customerDetails.firstName} ${order.customerDetails.lastName}</p>
        <p><strong>Phone:</strong> ${order.customerDetails.phoneNumber}</p>
        <p><strong>Address:</strong> ${order.customerDetails.houseNo}, ${order.customerDetails.street}, ${order.customerDetails.mandal}, ${order.customerDetails.district} - ${order.customerDetails.pincode}, ${order.customerDetails.state}</p>
        <p><strong>Payment:</strong> ${order.paymentMode}</p>
      `,
      confirmButtonText: "Close",
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins" }}>
        <Navbar />
      <h2>📦 Admin Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <h3>🧾 Order ID: {order.customerDetails.firstName} {order.customerDetails.lastName}</h3>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Ordered On:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <ul>
            {order.items.map((item, index) => (
                <li key={index} style={styles.itemRow}>
                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                    <div>
                    <p><strong>{item.name}</strong></p>
                    <p>₹{item.price} × {item.quantity}</p>
                    </div>
                </li>
                ))}
            </ul>

            <div style={styles.buttonRow}>
              {order.status === "Pending" && (
                <>
                  <button style={styles.confirmBtn} onClick={() => updateOrderStatus(order._id, "Confirmed")}>Confirm</button>
                  <button style={styles.rejectBtn} onClick={() => updateOrderStatus(order._id, "Rejected")}>Reject</button>
                </>
              )}

              {order.status === "Confirmed" && (
                <button style={styles.deliveredBtn} onClick={() => updateOrderStatus(order._id, "Delivered")}>
                  Mark as Delivered
                </button>
              )}

              <button style={styles.viewBtn} onClick={() => viewDetails(order)}>View Details</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  buttonRow: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  confirmBtn: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  rejectBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deliveredBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewBtn: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
    itemRow: {
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    },
    itemImage: {
        width: "50px",
        height: "50px",
        borderRadius: "5px",
        marginRight: "10px",
    },
    itemDetails: {
        flexGrow: 1,
    },
};

export default AdminOrders;
