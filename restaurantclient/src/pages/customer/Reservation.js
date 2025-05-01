import React, { useState, useEffect } from 'react';
import Navbar from "./navbarcustomer";
import '../../styles/Reservation.css';

// Import all images at the top
import interiorImg from '../../assets/images/restaurant-interior.jpeg';
import windowTableImg from '../../assets/images/window-table.jpeg';
import gardenTableImg from '../../assets/images/garden-table.jpeg';
import boothTableImg from '../../assets/images/booth-table.jpeg';
import familyhallImg from '../../assets/images/family-hall.jpeg';

// Import icons at the top (with optional fallback)
let FiArrowLeft, FiCalendar, FiClock, FiUsers, FiMail, FiUser;
try {
  const icons = require('react-icons/fi');
  ({
    FiArrowLeft,
    FiCalendar,
    FiClock,
    FiUsers,
    FiMail,
    FiUser
  } = icons);
} catch (e) {
  // Fallback components if react-icons not available
  FiArrowLeft = () => <span>←</span>;
  FiCalendar = () => <span>📅</span>;
  FiClock = () => <span>🕒</span>;
  FiUsers = () => <span>👥</span>;
  FiMail = () => <span>✉️</span>;
  FiUser = () => <span>👤</span>;
}

const ReservationExperience = () => {
    const [step, setStep] = useState('date');
    const [reservation, setReservation] = useState({
      date: null,
      time: null,
      guests: 2,
      name: '',
      email: '',
      specialRequests: '',
      tableType: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [animateTables, setAnimateTables] = useState(false);
  
    // Generate time slots from 8 AM to 10 PM in 30-minute increments
    const generateTimeSlots = () => {
      const slots = [];
      for (let hour = 8; hour <= 22; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = new Date();
          time.setHours(hour, minute, 0, 0);
          const period = hour >= 12 ? 'PM' : 'AM';
          const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
          slots.push({
            value: time,
            display: `${displayHour}:${minute === 0 ? '00' : '30'} ${period}`
          });
        }
      }
      return slots;
    };
  
    const availableTimes = generateTimeSlots();
  
    const tableOptions = [
      { id: 1, type: 'Window View', capacity: 2, image: windowTableImg, description: 'Beautiful view of the city skyline' },
      { id: 2, type: 'Garden Patio', capacity: 4, image: gardenTableImg, description: 'Outdoor seating surrounded by nature' },
      { id: 3, type: 'Private Booth', capacity: 6, image: boothTableImg, description: 'Cozy and intimate setting' },
      { id: 4, type: 'Family Hall', capacity: 20, image: familyhallImg, description: 'Spacious area for large gatherings' }
    ];
  
    useEffect(() => {
      if (step === 'table') {
        // Trigger animation after a short delay
        const timer = setTimeout(() => {
          setAnimateTables(true);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setAnimateTables(false);
      }
    }, [step]);
  
    const handleSelect = (type, value) => {
      setReservation(prev => ({ ...prev, [type]: value }));
      
      // Special handling for table selection
      if (type === 'tableType') {
        setStep('details');
      } else {
        const nextSteps = { date: 'time', time: 'table' };
        if (nextSteps[type]) setStep(nextSteps[type]);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('confirmed');
      setIsSubmitting(false);
    };
  
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      });
    };
  
    if (step === 'confirmed') {
      return (
        <div className="reservation-container" style={{ backgroundImage: `url(${interiorImg})` }}>
          <Navbar />
          <div className="confirmation-content">
            <div className="confirmation-icon">✓</div>
            <h2 class="reservation-confirmed">Reservation Confirmed!</h2>
            <div className="confirmation-details">
              <p><strong>Name:</strong> {reservation.name}</p>
              <p><strong>Date:</strong> {formatDate(reservation.date)}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Table:</strong> {reservation.tableType}</p>
              {reservation.specialRequests && (
                <p><strong>Requests:</strong> {reservation.specialRequests}</p>
              )}
            </div>
            <button className="btn-primary" onClick={() => setStep('date')}>
              Book Another Table
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="reservation-container" style={{ backgroundImage: `url(${interiorImg})` }}>
        <Navbar />
  
        {/* Date Selection */}
        {step === 'date' && (
          <div className="selection-panel1">
            <h2>When would you like to dine with us?</h2>
            <p className="panel-subtitle">Select your preferred date</p>
            
            <div className="date-grid">
              {[...Array(14)].map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const isWeekend = [0, 6].includes(date.getDay());
                
                return (
                  <div 
                    key={i}
                    className={`date-card 
                      ${reservation.date === date.toDateString() ? 'selected' : ''}
                      ${isWeekend ? 'weekend' : ''}
                    `}
                    onClick={() => handleSelect('date', date.toDateString())}
                  >
                    <span className="day">{date.toLocaleString('default', { weekday: 'short' })}</span>
                    <span className="date">{date.getDate()}</span>
                    <span className="month">{date.toLocaleString('default', { month: 'short' })}</span>
                    {isWeekend && <span className="weekend-badge">Weekend</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
  
        {/* Time Selection */}
        {step === 'time' && (
          <div className="selection-panel2">
            <div className="panel-header">
              <button className="back-button" onClick={() => setStep('date')}>
                <FiArrowLeft /> Back
              </button>
              <h2>Select Your Time</h2>
              <p className="panel-subtitle">{formatDate(reservation.date)}</p>
            </div>
            
            <div className="time-selection">
              <div className="time-category">
                <h3>Lunch</h3>
                <div className="time-grid">
                  {availableTimes.filter(t => 
                    t.value.getHours() >= 11 && t.value.getHours() < 15
                  ).map((time, i) => (
                    <button
                      key={i}
                      className={`time-card ${reservation.time === time.display ? 'selected' : ''}`}
                      onClick={() => handleSelect('time', time.display)}
                    >
                      {time.display}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="time-category">
                <h3>Dinner</h3>
                <div className="time-grid">
                  {availableTimes.filter(t => 
                    t.value.getHours() >= 17 || t.value.getHours() < 3
                  ).map((time, i) => (
                    <button
                      key={i}
                      className={`time-card ${reservation.time === time.display ? 'selected' : ''}`}
                      onClick={() => handleSelect('time', time.display)}
                    >
                      {time.display}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
  
        {/* Table Selection with Animations */}
        {step === 'table' && (
          <div className="selection-panel3">
            <div className="panel-header">
              <button className="back-button" onClick={() => setStep('time')}>
                <FiArrowLeft /> Back
              </button>
              <h2>Choose Your Table</h2>
              
            </div>
            
            <div className="table-grid">
              {tableOptions
                .filter(table => table.capacity >= reservation.guests)
                .map((table, index) => (
                  <div
                    key={table.id}
                    className={`table-card ${reservation.tableType === table.type ? 'selected' : ''} 
                      ${animateTables ? 'animate-in' : ''}`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      backgroundImage: `url(${table.image})`
                    }}
                    onClick={() => handleSelect('tableType', table.type)}
                  >
                    <div className="table-overlay">
                      <h3>{table.type}</h3>
                      <p className="table-capacity">Up to {table.capacity} guests</p>
                      <p className="table-description">{table.description}</p>
                      <div className={`selection-indicator ${reservation.tableType === table.type ? 'active' : ''}`}>
                        ✓
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
  
        {step === 'details' && (
          <div className="details-panel">
            <div className="panel-header">
              <button className="back-button" onClick={() => setStep('table')}>
                <FiArrowLeft /> Back
              </button>
              <h2>Complete Reservation</h2>
            </div>
            
            <div className="reservation-summary">
              <p><FiCalendar /> {formatDate(reservation.date)}</p>
              <p><FiClock /> {reservation.time}</p>
              
              <p><FiUser /> {reservation.tableType}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label><FiUser /> Full Name</label>
                <input
                  type="text"
                  value={reservation.name}
                  onChange={(e) => setReservation({...reservation, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label><FiMail /> Email</label>
                <input
                  type="email"
                  value={reservation.email}
                  onChange={(e) => setReservation({...reservation, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  value={reservation.specialRequests}
                  onChange={(e) => setReservation({...reservation, specialRequests: e.target.value})}
                  placeholder="Dietary restrictions, allergies, celebrations, etc."
                />
              </div>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  export default ReservationExperience;