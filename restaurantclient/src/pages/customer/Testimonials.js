import React, { useState, useEffect } from 'react';
import '../../styles/Testimonials.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Alexander Windsor",
      role: "Food Critic, Elite Dining Magazine",
      content: "Royal Feast redefines fine dining. Their Lobster Thermidor is the best I've tasted outside of Paris. The ambiance, service, and attention to detail make this restaurant truly worthy of its name.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sophia Delacroix",
      role: "Michelin Guide Reviewer",
      content: "The Wagyu Beef Wellington was cooked to absolute perfection. The wine pairing suggestions from the sommelier elevated the experience to new heights. This is culinary excellence at its finest.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Rajesh Patel",
      role: "Frequent Patron",
      content: "I've celebrated three anniversaries at Royal Feast and each experience has been extraordinary. Their Golden Saffron Risotto is worth every penny. The staff remembers our preferences, which makes us feel truly valued.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      id: 4,
      name: "Isabella Montgomery",
      role: "Travel & Leisure Contributor",
      content: "The tasting menu was a journey through culinary artistry. Each course was beautifully presented and more delicious than the last. The chocolate soufflé finale was the perfect ending to a perfect meal.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 8000);
    return () => clearTimeout(timer);
  }, [activeTestimonial]);

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const goToTestimonial = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTestimonial(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Royal Acclaim</h2>
          <p className="section-subtitle">Voices of Distinction</p>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-icon">✻</div>
            <div className="decoration-line"></div>
          </div>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-wrapper">
            <div className={`testimonial-card ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <div className="testimonial-profile">
                <div className="profile-image-container">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="profile-image"
                  />
                  <div className="profile-decoration"></div>
                </div>
                <div className="profile-info">
                  <h3 className="author-name">{testimonials[activeTestimonial].name}</h3>
                  <p className="author-role">{testimonials[activeTestimonial].role}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill={i < testimonials[activeTestimonial].rating ? "#FFD700" : "#E0E0E0"} 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="testimonial-content">
                <div className="quote-icon top">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 16H16C17.1046 16 18 15.1046 18 14V8C18 6.89543 17.1046 6 16 6H14C12.8954 6 12 6.89543 12 8V14C12 15.1046 12.8954 16 14 16Z" fill="#d4af37"/>
                    <path d="M8 16H10C11.1046 16 12 15.1046 12 14V8C12 6.89543 11.1046 6 10 6H8C6.89543 6 6 6.89543 6 8V14C6 15.1046 6.89543 16 8 16Z" fill="#d4af37"/>
                  </svg>
                </div>
                
                <p className="testimonial-text">{testimonials[activeTestimonial].content}</p>
                
                <div className="quote-icon bottom">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8H8C6.89543 8 6 8.89543 6 10V16C6 17.1046 6.89543 18 8 18H10C11.1046 18 12 17.1046 12 16V10C12 8.89543 11.1046 8 10 8Z" fill="#d4af37"/>
                    <path d="M18 8H16C14.8954 8 14 8.89543 14 10V16C14 17.1046 14.8954 18 16 18H18C19.1046 18 20 17.1046 20 16V10C20 8.89543 19.1046 8 18 8Z" fill="#d4af37"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button 
              className="nav-button prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <span className="dot-inner"></span>
                </button>
              ))}
            </div>
            
            <button 
              className="nav-button next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="background-pattern"></div>
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </section>
  );
};

export default Testimonials;