import React, { useState, useEffect } from 'react';
import NavbarAdmin from './navbaradmin';
import { 
  FiSearch, FiCalendar, FiClock, FiUsers, 
  FiTrash2, FiRefreshCw, FiPrinter, FiMail, 
  FiUser, FiPhone, FiFilter, FiChevronUp, FiChevronDown,
  FiBell
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import '../../styles/AdminReservation.css';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newReservationsCount, setNewReservationsCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [notification, setNotification] = useState(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('newReservation', (reservation) => {
      setReservations(prev => [reservation, ...prev]);
      setNewReservationsCount(prev => prev + 1);
      
      // Show notification
      setNotification({
        id: Date.now(),
        message: `New reservation from ${reservation.name}`,
        type: 'success'
      });
      
      // Auto hide notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/reservations');
      const data = await response.json();
      setReservations(data);
      setNewReservationsCount(0);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setNotification({
        id: Date.now(),
        message: 'Failed to load reservations',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchReservations(); 
  }, []);

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedReservations = [...reservations].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter reservations
  const filteredReservations = sortedReservations.filter(reservation => {
    const matchesSearch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = new Date(reservation.date).toDateString() === selectedDate.toDateString();
    const matchesStatus = selectedStatus === 'all' || reservation.status === selectedStatus;
    return matchesSearch && matchesDate && matchesStatus;
  });

  // Empty state component
  const EmptyState = () => (
    <div className="empty-reservations">
      <div className="empty-icon">
        <FiCalendar size={64} />
      </div>
      <h2>No Reservations Yet</h2>
      <p>
        {reservations.length === 0 
          ? "No reservations have been made yet. They will appear here automatically."
          : "No reservations match your current filters."}
      </p>
      <button className="refresh-button" onClick={fetchReservations}>
        <FiRefreshCw /> Refresh
      </button>
    </div>
  );

  // Status update handler
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchReservations();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setNotification({
        id: Date.now(),
        message: 'Failed to update reservation status',
        type: 'error'
      });
    }
  };

  // Delete reservation
  const deleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/reservations/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          fetchReservations();
          setNotification({
            id: Date.now(),
            message: 'Reservation deleted successfully',
            type: 'success'
          });
        } else {
          throw new Error('Failed to delete reservation');
        }
      } catch (error) {
        console.error("Error deleting reservation:", error);
        setNotification({
          id: Date.now(),
          message: 'Failed to delete reservation',
          type: 'error'
        });
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredReservations.length === 0) return;
    
    const headers = ['Name', 'Email', 'Phone', 'Date', 'Time', 'Guests', 'Table', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredReservations.map(r => [
        `"${r.name}"`, `"${r.email}"`, `"${r.phone}"`, r.date, r.time, 
        r.guests, `"${r.tableType}"`, r.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FiFilter size={14} />;
    return sortConfig.direction === 'asc' 
      ? <FiChevronUp size={14} /> 
      : <FiChevronDown size={14} />;
  };

  return (
    <div className="admin-layout">
      <NavbarAdmin />
      
      <div className="admin-content">
        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`notification ${notification.type}`}
            >
              <FiBell /> {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="admin-reservations-container">
          {/* Header Section */}
          <div className="admin-header">
            <h1 className="admin-title">Reservation Management</h1>
            <div className="admin-actions">
              <button className="refresh-button" onClick={fetchReservations}>
                <FiRefreshCw /> Refresh {newReservationsCount > 0 && 
                  <span className="new-count">{newReservationsCount}</span>}
              </button>
              <button 
                className="export-button" 
                onClick={exportToCSV}
                disabled={filteredReservations.length === 0}
              >
                <FiPrinter /> Export
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card total">
              <h3>Total Reservations</h3>
              <p>{reservations.length}</p>
            </div>
            <div className="stat-card today">
              <h3>Today</h3>
              <p>{reservations.filter(r => 
                new Date(r.date).toDateString() === new Date().toDateString()
              ).length}</p>
            </div>
            <div className="stat-card confirmed">
              <h3>Confirmed</h3>
              <p>{reservations.filter(r => r.status === 'confirmed').length}</p>
            </div>
            <div className="stat-card pending">
              <h3>Pending</h3>
              <p>{reservations.filter(r => r.status === 'pending').length}</p>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="date-picker">
              <FiCalendar className="calendar-icon" />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>

            <div className="status-filter">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Reservations Table */}
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            <div className="reservations-table-container">
              {filteredReservations.length > 0 ? (
                <table className="reservations-table">
                  <thead>
                    <tr>
                      <th onClick={() => requestSort('name')}>
                        <div className="th-content">
                          Customer {getSortIcon('name')}
                        </div>
                      </th>
                      <th>Contact</th>
                      <th onClick={() => requestSort('date')}>
                        <div className="th-content">
                          Date & Time {getSortIcon('date')}
                        </div>
                      </th>
                      <th onClick={() => requestSort('guests')}>
                        <div className="th-content">
                          Guests {getSortIcon('guests')}
                        </div>
                      </th>
                      <th>Table</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredReservations.map(reservation => (
                        <motion.tr
                          key={reservation._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`reservation-row ${reservation.status}`}
                        >
                          <td className="customer-cell">
                            <div className="customer-avatar">
                              {reservation.name.charAt(0)}
                            </div>
                            <div className="customer-details">
                              <div className="customer-name">{reservation.name}</div>
                              {reservation.specialRequests && (
                                <div className="customer-notes">
                                  <FiUser /> {reservation.specialRequests}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="contact-cell">
                            <div className="customer-email">
                              <FiMail /> {reservation.email}
                            </div>
                            <div className="customer-phone">
                              <FiPhone /> {reservation.phone}
                            </div>
                          </td>
                          <td className="datetime-cell">
                            <div className="reservation-date">
                              {new Date(reservation.date).toLocaleDateString()}
                            </div>
                            <div className="reservation-time">
                              <FiClock /> {reservation.time}
                            </div>
                          </td>
                          <td className="guests-cell">
                            <FiUsers /> {reservation.guests}
                          </td>
                          <td className="table-cell">
                            {reservation.tableType}
                          </td>
                          <td className="status-cell">
                            <select
                              value={reservation.status}
                              onChange={(e) => updateStatus(reservation._id, e.target.value)}
                              className={`status-select ${reservation.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="actions-cell">
                            <button 
                              className="email-button"
                              onClick={() => window.location.href = `mailto:${reservation.email}`}
                            >
                              <FiMail />
                            </button>
                            <button 
                              className="delete-button"
                              onClick={() => deleteReservation(reservation._id)}
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              ) : (
                <EmptyState />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;