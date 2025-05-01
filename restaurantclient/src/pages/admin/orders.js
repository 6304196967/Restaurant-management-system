import React, { useEffect, useState } from "react";
import { FiFilter, FiRefreshCw, FiInfo, FiCheck, FiX, FiTruck, FiXCircle } from "react-icons/fi";
import Navbar from "./navbaradmin";
import "../../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({ orderId: "", newStatus: "" });

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setIsLoading(true);
      const adminEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/order/adminallorders?email=${adminEmail}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      // You might want to add a toast notification here instead
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdateClick = (orderId, newStatus) => {
    setStatusUpdateData({ orderId, newStatus });
    setShowConfirmModal(true);
  };

  const updateOrderStatus = async () => {
    try {
      const { orderId, newStatus } = statusUpdateData;
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/order/update/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      // Close modals and refresh data
      setShowConfirmModal(false);
      fetchAllOrders();
    } catch (error) {
      console.error("Could not update order", error);
      // You might want to add a toast notification here
    }
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setStatusUpdateData({ orderId: "", newStatus: "" });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { color: "#ff9800", bg: "#fff3e0" },
      Confirmed: { color: "#2196f3", bg: "#e3f2fd" },
      Delivered: { color: "#4caf50", bg: "#e8f5e9" },
      Rejected: { color: "#f44336", bg: "#ffebee" },
    };

    return (
      <span 
        className="status-badge"
        style={{ 
          backgroundColor: statusStyles[status]?.bg || "#f5f5f5",
          color: statusStyles[status]?.color || "#333",
        }}
      >
        {status}
      </span>
    );
  };

  const filteredOrders = orders
    .filter(order => filterStatus === "All" || order.status === filterStatus)
    .filter(order => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        order.customerDetails.firstName.toLowerCase().includes(searchLower) ||
        order.customerDetails.lastName.toLowerCase().includes(searchLower) ||
        order._id.toLowerCase().includes(searchLower) ||
        order.customerDetails.phoneNumber.includes(searchQuery)
      );
    });

  return (
    <div className="admin-orders-container">
      <Navbar />
      
      <div className="orders-content">
        <div className="orders-header">
          <h1>Order Management</h1>
          <p>View and manage customer orders</p>
        </div>

        <div className="orders-controls">
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, phone or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="filter-controls">
              <div className="filter-select">
                <FiFilter className="filter-icon" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              
              <button 
                className="refresh-btn"
                onClick={fetchAllOrders}
                disabled={isLoading}
              >
                <FiRefreshCw className={isLoading ? "spin" : ""} />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-orders">
            <img src="/images/no-orders.svg" alt="No orders" />
            <h3>No orders found</h3>
            <p>Try changing your filters or refresh the page</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>
                      {order.customerDetails.firstName} {order.customerDetails.lastName}
                    </h3>
                    <p className="order-id">Order ID: {order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="order-meta">
                    <p className="order-date">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                <div className="order-summary">
                  <div className="order-items-preview">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name} × {item.quantity}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="more-items">+{order.items.length - 2} more</div>
                    )}
                  </div>
                  
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">₹{order.totalPrice}</span>
                  </div>
                </div>

                <div className="order-actions">
                  {order.status === "Pending" && (
                    <>
                      <button
                        className="action-btn confirm-btn"
                        onClick={() => handleStatusUpdateClick(order._id, "Confirmed")}
                      >
                        <FiCheck /> Confirm
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleStatusUpdateClick(order._id, "Rejected")}
                      >
                        <FiX /> Reject
                      </button>
                    </>
                  )}

                  {order.status === "Confirmed" && (
                    <button
                      className="action-btn deliver-btn"
                      onClick={() => handleStatusUpdateClick(order._id, "Delivered")}
                    >
                      <FiTruck /> Mark Delivered
                    </button>
                  )}

                  <button 
                    className="action-btn details-btn"
                    onClick={() => viewDetails(order)}
                  >
                    <FiInfo /> Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <FiXCircle />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="order-details-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.customerDetails.firstName} {selectedOrder.customerDetails.lastName}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerDetails.phoneNumber}</p>
                <p><strong>Email:</strong> {selectedOrder.customerDetails.email || "N/A"}</p>
              </div>
              
              <div className="order-details-section">
                <h3>Delivery Address</h3>
                <p>{selectedOrder.customerDetails.houseNo}, {selectedOrder.customerDetails.street}</p>
                <p>{selectedOrder.customerDetails.mandal}, {selectedOrder.customerDetails.district}</p>
                <p>{selectedOrder.customerDetails.state} - {selectedOrder.customerDetails.pincode}</p>
              </div>
              
              <div className="order-details-section">
                <h3>Payment Information</h3>
                <p><strong>Method:</strong> {selectedOrder.paymentMode}</p>
                <p><strong>Total Amount:</strong> ₹{selectedOrder.totalPrice}</p>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
              </div>
              
              <div className="order-details-section">
                <h3>Order Items ({selectedOrder.items.length})</h3>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p><strong>{item.name}</strong></p>
                        <p>₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal-container">
            <div className="modal-header">
              <h2>Confirm Update</h2>
              <button className="modal-close-btn" onClick={closeConfirmModal}>
                <FiXCircle />
              </button>
            </div>
            
            <div className="modal-content">
              <p>Are you sure you want to mark this order as <strong>{statusUpdateData.newStatus}</strong>?</p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="modal-cancel-button"
                onClick={closeConfirmModal}
              >
                Cancel
              </button>
              <button 
                className="modal-confirm-button"
                onClick={updateOrderStatus}
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;