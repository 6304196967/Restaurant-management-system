import React, { useEffect, useRef } from 'react';
import '../../styles/HeroSection.css'; 

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background" ref={heroRef}>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content" ref={textRef}>
        <h1 className="hero-title">
          <span className="title-line">Royal Feast</span>
          <span className="title-line">Culinary Excellence</span>
        </h1>
        <p className="hero-subtitle">Where every meal is a regal experience</p>
        
        <div className="hero-cta">
          <button className="cta-button primary">Reserve a Table</button>
          <button className="cta-button secondary">View Menu</button>
        </div>
        
        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll to Explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </div>
      
      <div className="hero-decoration">
        <div className="decoration-item plate"></div>
        <div className="decoration-item herbs"></div>
        <div className="decoration-item cutlery"></div>
      </div>
    </section>
  );
};

export default HeroSection;