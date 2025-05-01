import React, { useEffect, useState } from "react";
import Navbar from "./navbaradmin";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  useEffect(() => {
    const adminEmail = localStorage.getItem("email");
    if (!adminEmail) {
      console.error("Admin email not found in localStorage");
      setLoading(false);
      return;
    }
  
    fetch(`https://restaurant-management-backend-1.onrender.com/api/feedback/admin/feedbacks?email=${encodeURIComponent(adminEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFeedbacks(data);
        } else if (Array.isArray(data.feedbacks)) {
          setFeedbacks(data.feedbacks);
        } else {
          console.error("Unexpected response format", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err);
        setLoading(false);
      });
  }, []);

  const filteredFeedbacks = feedbacks.filter(fb => {
    const matchesSearch = searchTerm === "" || 
      (fb.orderId?.customerName?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (fb.email?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (fb.itemName?.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (fb.feedback?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRating = ratingFilter === "all" || fb.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesRating;
  });

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFF5E6'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: 'white',
          boxShadow: '0 4px 24px rgba(255, 107, 0, 0.15)',
          width: '300px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid #FFE8CC',
            borderTop: '5px solid #FF6B00',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{
            fontSize: '18px',
            color: '#FF6B00',
            fontWeight: '600',
            margin: '0'
          }}>Loading Feedback</p>
          <p style={{
            color: '#7F8C8D',
            margin: '8px 0 0',
            fontSize: '14px'
          }}>Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFF5E6',
      paddingTop: '70px'
    }}>
      <Navbar />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Header with Search */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 24px rgba(255, 107, 0, 0.1)',
          padding: '25px',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div>
              <h1 style={{
                color: '#E05A00',
                margin: '0 0 5px',
                fontSize: '28px',
                fontWeight: '700'
              }}>Customer Feedback</h1>
              <p style={{
                color: '#7F8C8D',
                margin: '0',
                fontSize: '16px'
              }}>{feedbacks.length} total feedback entries</p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                position: 'relative',
                minWidth: '250px'
              }}>
                <input
                  type="text"
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '12px 15px 12px 40px',
                    border: '1px solid #FFD699',
                    borderRadius: '8px',
                    width: '100%',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    ':focus': {
                      borderColor: '#FF6B00',
                      boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.2)'
                    }
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#FF6B00'
                }}>🔍</span>
              </div>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                style={{
                  padding: '12px 15px',
                  border: '1px solid #FFD699',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  minWidth: '180px',
                  transition: 'all 0.2s',
                  ':focus': {
                    borderColor: '#FF6B00',
                    boxShadow: '0 0 0 3px rgba(255, 107, 0, 0.2)'
                  }
                }}
              >
                <option value="all">All Ratings</option>
                <option value="5">⭐ 5 Stars</option>
                <option value="4">⭐ 4 Stars</option>
                <option value="3">⭐ 3 Stars</option>
                <option value="2">⭐ 2 Stars</option>
                <option value="1">⭐ 1 Star</option>
              </select>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '10px'
          }}>
            <div style={{
              backgroundColor: '#FFF0D9',
              borderRadius: '20px',
              padding: '6px 15px',
              fontSize: '14px',
              color: '#E05A00',
              whiteSpace: 'nowrap'
            }}>
              All: {feedbacks.length}
            </div>
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} style={{
                backgroundColor: '#FFF0D9',
                borderRadius: '20px',
                padding: '6px 15px',
                fontSize: '14px',
                color: '#E05A00',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#FFE0B2'
                },
                ...(ratingFilter === rating.toString() && {
                  backgroundColor: '#FF6B00',
                  color: 'white'
                })
              }} onClick={() => setRatingFilter(rating.toString())}>
                {rating} Stars: {feedbacks.filter(fb => fb.rating === rating).length}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Cards */}
        {filteredFeedbacks.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {filteredFeedbacks.map((fb, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(255, 107, 0, 0.15)'
                }
              }}>
                <div style={{
                  backgroundColor: '#FF6B00',
                  padding: '15px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 style={{
                    color: 'white',
                    margin: '0',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {fb.orderId?.customerName || fb.email || "Anonymous"}
                  </h3>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span>⭐</span>
                    <span>{fb.rating}/5</span>
                  </div>
                </div>
                
                <div style={{
                  padding: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#FFF0D9',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FF6B00',
                      flexShrink: '0'
                    }}>
                      🍔
                    </div>
                    <div>
                      <p style={{
                        margin: '0',
                        color: '#555',
                        fontWeight: '600',
                        fontSize: '16px'
                      }}>{fb.itemName || "Unknown Item"}</p>
                      <p style={{
                        margin: '3px 0 0',
                        color: '#7F8C8D',
                        fontSize: '13px'
                      }}>
                        {new Date(fb.createdAt || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{
                    backgroundColor: '#FFF9F0',
                    borderRadius: '8px',
                    padding: '15px',
                    borderLeft: '3px solid #FFB347'
                  }}>
                    <p style={{
                      margin: '0',
                      color: '#333',
                      lineHeight: '1.6',
                      fontStyle: fb.feedback ? 'normal' : 'italic'
                    }}>
                      {fb.feedback || "No feedback comment provided"}
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '5px',
                    marginTop: '15px'
                  }}>
                    {Array(5).fill().map((_, i) => (
                      <div key={i} style={{
                        height: '6px',
                        borderRadius: '3px',
                        flex: '1',
                        backgroundColor: i < fb.rating ? '#FFB347' : '#EEE',
                        transition: 'all 0.3s'
                      }}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(255, 107, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '80px',
              color: '#FFD699',
              marginBottom: '20px'
            }}>😕</div>
            <h3 style={{
              color: '#E05A00',
              margin: '0 0 10px',
              fontSize: '22px',
              fontWeight: '600'
            }}>No feedback found</h3>
            <p style={{
              color: '#7F8C8D',
              margin: '0 0 20px',
              fontSize: '16px'
            }}>We couldn't find any feedback matching your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setRatingFilter("all");
              }}
              style={{
                backgroundColor: '#FF6B00',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#E05A00'
                }
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Global styles for animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default FeedbackList;