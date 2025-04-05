import React, { useEffect, useState } from "react";
import Navbar from "./navbaradmin";
function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminEmail = localStorage.getItem("email"); // or whatever key you used to store it
    if (!adminEmail) {
      console.error("Admin email not found in localStorage");
      setLoading(false);
      return;
    }
  
    fetch(`http://localhost:3000/api/feedback/admin/feedbacks?email=${encodeURIComponent(adminEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Feedbacks:", data);
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
  
  if (loading) {
    return <div style={styles.loading}>Loading feedbacks...</div>;
  }

  return (
    <div style={styles.container}>
        <Navbar />
      <h2 style={styles.heading}>User Feedbacks</h2>
      {feedbacks.length > 0 ? (
        feedbacks.map((fb, index) => (
          <div style={styles.card} key={index}>
            <h3 style={styles.name}>{fb.orderId?.customerName || fb.email}</h3>
            <p><strong>Item:</strong> {fb.itemName}</p>
            <p><strong>Review:</strong> {fb.feedback}</p>
            <p style={styles.stars}>
              {"⭐".repeat(fb.rating)} <span style={styles.outOf}>({fb.rating}/5)</span>
            </p>
          </div>
        ))
      ) : (
        <p style={styles.noData}>No feedbacks available.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    background: '#fff3e0',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(255, 152, 0, 0.2)',
  },
  heading: {
    textAlign: 'center',
    color: '#e65100',
    marginBottom: '30px',
  },
  card: {
    background: '#ffe0b2',
    borderLeft: '5px solid #ff9800',
    padding: '15px 20px',
    marginBottom: '20px',
    borderRadius: '10px',
    transition: 'transform 0.2s ease',
  },
  name: {
    color: '#e65100',
    marginBottom: '10px',
  },
  stars: {
    fontSize: '18px',
    color: '#ff6f00',
  },
  outOf: {
    fontSize: '14px',
    color: '#6d4c41',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#e65100',
  },
  noData: {
    textAlign: 'center',
    color: '#bf360c',
    fontWeight: 'bold',
  },
};

export default FeedbackList;
