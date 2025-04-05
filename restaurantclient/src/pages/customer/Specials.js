import React, { useState, useEffect } from 'react';
import '../../styles/Specials.css'; // Adjust the path as necessary

const Specials = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const difference = tomorrow - now;
    
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return (
    <section className="specials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Today's Royal Special</h2>
          <p className="section-subtitle">Available for a limited time only</p>
          <div className="title-decoration"></div>
        </div>
        
        <div 
          className={`special-card ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="special-image">
            <img 
              src="https://images.unsplash.com/photo-1600320641095-b5a7f5d2d434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Chef's Special" 
              loading="lazy" 
            />
            <div className="special-badge">Chef's Crown Pick</div>
          </div>
          
          <div className="special-content">
            <h3>Truffle Infused Golden Risotto</h3>
            <p className="special-description">
              Creamy Arborio rice cooked to perfection with wild mushrooms, white truffle oil, 
              and aged Parmesan, finished with edible gold leaf and a drizzle of truffle butter.
            </p>
            
            <div className="price-countdown-container">
              <div className="special-price">
                <span className="original-price">$32</span>
                <span className="discounted-price">$28</span>
              </div>
              
              <div className="countdown">
                <p className="countdown-title">Available until midnight:</p>
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="order-button">
              <span>Order Now</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="background-decoration"></div>
    </section>
  );
};

export default Specials;