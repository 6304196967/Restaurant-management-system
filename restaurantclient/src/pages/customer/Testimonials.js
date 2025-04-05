import React, { useState } from 'react';
import '../../styles/Testimonials.css';

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Royal Acclaim</h2>
          <p className="section-subtitle">What our distinguished guests say</p>
          <div className="title-decoration"></div>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-nav">
            <button 
              className="nav-button prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="testimonial-track">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === activeTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 16H16C17.1046 16 18 15.1046 18 14V8C18 6.89543 17.1046 6 16 6H14C12.8954 6 12 6.89543 12 8V14C12 15.1046 12.8954 16 14 16Z" fill="#ff9766"/>
                        <path d="M8 16H10C11.1046 16 12 15.1046 12 14V8C12 6.89543 11.1046 6 10 6H8C6.89543 6 6 6.89543 6 8V14C6 15.1046 6.89543 16 8 16Z" fill="#ff9766"/>
                      </svg>
                    </div>
                    <p className="testimonial-text">{testimonial.content}</p>
                    <div className="testimonial-footer">
                      <div className="author-info">
                        <div className="author-image">
                          <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                        <div className="author-details">
                          <h4 className="author-name">{testimonial.name}</h4>
                          <p className="author-role">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill={i < testimonial.rating ? "#ff5200" : "#ffdccc"} 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#ff5200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="nav-button next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="background-decoration"></div>
    </section>
  );
};

export default Testimonials;