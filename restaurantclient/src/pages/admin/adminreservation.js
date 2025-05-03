import React, { useEffect, useState } from "react";
import { FiFilter, FiRefreshCw, FiInfo, FiCheck, FiX, FiTruck, FiXCircle, FiClock, FiUsers } from "react-icons/fi";
import Navbar from "./navbaradmin";
import "../../styles/AdminOrders.css";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({ reservationId: "", newStatus: "" });

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      setIsLoading(true);
      const adminEmail = localStorage.getItem("email");
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/reserve/allreservations`,
        {
          headers: {
            'email': adminEmail
          }
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdateClick = (reservationId, newStatus) => {
    setStatusUpdateData({ reservationId, newStatus });
    setShowConfirmModal(true);
  };

  const updateReservationStatus = async () => {
    try {
      const { reservationId, newStatus } = statusUpdateData;
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/reserve/update/${reservationId}`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            'email': localStorage.getItem("email")
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      setShowConfirmModal(false);
      fetchAllReservations();
    } catch (error) {
      console.error("Could not update reservation", error);
    }
  };

  const viewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setStatusUpdateData({ reservationId: "", newStatus: "" });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { color: "#ff9800", bg: "#fff3e0" },
      Confirmed: { color: "#2196f3", bg: "#e3f2fd" },
      Completed: { color: "#4caf50", bg: "#e8f5e9" },
      Cancelled: { color: "#f44336", bg: "#ffebee" },
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

  const filteredReservations = reservations
    .filter(reservation => filterStatus === "All" || reservation.status === filterStatus)
    .filter(reservation => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        reservation.name.toLowerCase().includes(searchLower) ||
        reservation.email.toLowerCase().includes(searchLower) ||
        reservation._id.toLowerCase().includes(searchLower) ||
        reservation.phone.includes(searchQuery)
      );
    });

  return (
    <div className="admin-orders-container">
      <Navbar />
      
      <div className="orders-content">
        <div className="orders-header">
          <h1>Reservation Management</h1>
          <p>View and manage customer reservations</p>
        </div>

        <div className="orders-controls">
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, phone or reservation ID..."
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
                  <option value="All">All Reservations</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <button 
                className="refresh-btn"
                onClick={fetchAllReservations}
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
            <p>Loading reservations...</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="no-orders">
            <img src="/images/no-orders.svg" alt="No reservations" />
            <h3>No reservations found</h3>
            <p>Try changing your filters or refresh the page</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredReservations.map((reservation) => (
              <div key={reservation._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>{reservation.name}</h3>
                    <p className="order-id">Reservation ID: {reservation._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="order-meta">
                    <p className="order-date">
                      {new Date(reservation.date).toLocaleDateString()}
                    </p>
                    {getStatusBadge(reservation.status)}
                  </div>
                </div>

                <div className="order-summary">
                  <div className="order-items-preview">
                    <div className="order-item">
                      <FiClock />
                      <span>{reservation.time}</span>
                    </div>
                    <div className="order-item">
                      <FiUsers />
                      <span>{reservation.guests} guests</span>
                    </div>
                    {reservation.specialRequests && (
                      <div className="more-items">+ Special Requests</div>
                    )}
                  </div>
                  
                  <div className="order-total">
                    <span>Table:</span>
                    <span className="total-amount">{reservation.tableType}</span>
                  </div>
                </div>

                <div className="order-actions">
                  {reservation.status === "Pending" && (
                    <>
                      <button
                        className="action-btn confirm-btn"
                        onClick={() => handleStatusUpdateClick(reservation._id, "Confirmed")}
                      >
                        <FiCheck /> Confirm
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleStatusUpdateClick(reservation._id, "Cancelled")}
                      >
                        <FiX /> Reject
                      </button>
                    </>
                  )}

                  {reservation.status === "Confirmed" && (
                    <button
                      className="action-btn deliver-btn"
                      onClick={() => handleStatusUpdateClick(reservation._id, "Completed")}
                    >
                      <FiTruck /> Mark Completed
                    </button>
                  )}

                  <button 
                    className="action-btn details-btn"
                    onClick={() => viewDetails(reservation)}
                  >
                    <FiInfo /> Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reservation Details Modal */}
      {showModal && selectedReservation && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Reservation Details</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <FiXCircle />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="order-details-section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedReservation.name}</p>
                <p><strong>Phone:</strong> {selectedReservation.phone}</p>
                <p><strong>Email:</strong> {selectedReservation.email || "N/A"}</p>
              </div>
              
              <div className="order-details-section">
                <h3>Reservation Details</h3>
                <p><strong>Date:</strong> {new Date(selectedReservation.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedReservation.time}</p>
                <p><strong>Guests:</strong> {selectedReservation.guests}</p>
                <p><strong>Table Type:</strong> {selectedReservation.tableType}</p>
                <p><strong>Status:</strong> {getStatusBadge(selectedReservation.status)}</p>
              </div>
              
              {selectedReservation.specialRequests && (
                <div className="order-details-section">
                  <h3>Special Requests</h3>
                  <p>{selectedReservation.specialRequests}</p>
                </div>
              )}
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
              <p>Are you sure you want to mark this reservation as <strong>{statusUpdateData.newStatus}</strong>?</p>
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
                onClick={updateReservationStatus}
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

export default AdminReservations;