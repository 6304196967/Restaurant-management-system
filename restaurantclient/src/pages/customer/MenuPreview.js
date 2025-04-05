import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/MenuPreview.css';

const MenuPreview = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const menuItems = [
    {
      id: 1,
      title: 'Royal Starters',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Begin your culinary journey with our exquisite selection of appetizers fit for royalty.',
      items: [
        'Truffle Arancini with Gold Leaf',
        'Scallop Ceviche in Citrus Emulsion',
        'Heirloom Tomato & Burrata Tower'
      ],
      badge: 'Chef\'s Selection'
    },
    {
      id: 2,
      title: 'Main Courses',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Our chef\'s signature dishes prepared with the world\'s finest ingredients.',
      items: [
        'A5 Wagyu Beef Wellington',
        'Lobster Thermidor Royale',
        'Duck Confit with Black Truffle'
      ],
      badge: 'Most Popular'
    },
    {
      id: 3,
      title: 'Decadent Desserts',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'Sweet endings to your perfect dining experience, crafted by our pastry maestro.',
      items: [
        'Valrhona Chocolate Soufflé',
        'Golden Crème Brûlée',
        'Seasonal Fruit Tart with Saffron Cream'
      ],
      badge: 'Sweet Indulgence'
    }
  ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <section className="menu-preview-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Royal Menu</h2>
          <p className="section-subtitle">Experience culinary excellence through our signature collections</p>
          <div className="title-decoration"></div>
        </div>
        
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className={`menu-card ${flippedCard === item.id ? 'flipped' : ''}`}
              onClick={() => handleCardClick(item.id)}
            >
              <div className="menu-card-inner">
                <div className="menu-card-front">
                  <div className="menu-card-image">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    {item.badge && <div className="menu-badge">{item.badge}</div>}
                    <div className="image-overlay"></div>
                  </div>
                  <h3 className="menu-card-title">{item.title}</h3>
                  <div className="view-details">
                    <span>View Selection</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="menu-card-back">
                  <h3 className="menu-card-title">{item.title}</h3>
                  <p className="menu-description">{item.description}</p>
                  <ul className="menu-items">
                    {item.items.map((menuItem, index) => (
                      <li key={index} className="menu-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="#ff7533" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {menuItem}
                      </li>
                    ))}
                  </ul>
                  <div className="flip-back">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Flip Back</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-full-menu">
          <Link to="/customer/Mcategories" className="view-all-button">
            View Complete Menu
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="background-decoration"></div>
    </section>
  );
};

export default MenuPreview;