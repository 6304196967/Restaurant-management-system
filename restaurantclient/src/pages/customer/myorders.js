import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [editMode, setEditMode] = useState({}); // ✅ Track edit mode

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(
          `http://localhost:3000/api/order/allorders?email=${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);

        // ✅ Fetch feedbacks after orders
        await fetchFeedbacks(email);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Fetch feedbacks for current user
  const fetchFeedbacks = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/feedback/getfeedbacks?email=${email}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }

      const feedbackData = await response.json();
      const feedbackMap = {};
      feedbackData.forEach((item) => {
        feedbackMap[item.itemName] = {
          review: item.feedback,
          rating: item.rating,
        };
      });
      setFeedbacks(feedbackMap);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // ⭐ Handle review submission or update
  const handleReviewSubmit = async (itemId, itemName) => {
    const review = reviews[itemId] || feedbacks[itemName]?.review || "";
    const rating = ratings[itemId] || feedbacks[itemName]?.rating || 0;

    if (!review || !rating) {
      alert(`Please enter both review and rating for ${itemName}! 🌟`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/feedback/addfeedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            feedback: review,
            rating: rating,
            itemName: itemName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review.");
      }

      alert(
        feedbacks[itemName]
          ? `Review updated successfully for ${itemName}! 🎉`
          : `Thank you for your feedback on ${itemName}! 🎉`
      );

      await fetchFeedbacks(localStorage.getItem("email")); // ✅ Refetch feedbacks
      setEditMode({ ...editMode, [itemId]: false }); // ✅ Exit edit mode
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // ⭐ Enable edit mode
  const handleEditReview = (itemId, itemName) => {
    setReviews({
      ...reviews,
      [itemId]: feedbacks[itemName]?.review || "",
    });
    setRatings({
      ...ratings,
      [itemId]: feedbacks[itemName]?.rating || 0,
    });
    setEditMode({ ...editMode, [itemId]: true });
  };

  // ⭐ Handle rating click
  const handleRatingClick = (itemId, star) => {
    setRatings({ ...ratings, [itemId]: star });
  };

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "26px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    orderList: {
      listStyleType: "none",
      padding: 0,
    },
    orderItem: {
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "15px",
      backgroundColor: "#f9f9f9",
    },
    itemContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    itemImage: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      marginRight: "12px",
    },
    itemDetails: {
      flex: 1,
    },
    reviewInput: {
      marginTop: "10px",
      padding: "8px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    starContainer: {
      display: "flex",
      marginTop: "10px",
    },
    star: {
      fontSize: "22px",
      cursor: "pointer",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "8px 12px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.header}>My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <ul style={styles.orderList}>
          {orders.map((order) => (
            <li key={order._id} style={styles.orderItem}>
              <p>
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <div>
                <strong>Items:</strong>
                <ul style={styles.orderList}>
                  {order.items.map((item) => (
                    <li key={item._id} style={styles.itemContainer}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.itemImage}
                      />
                      <div style={styles.itemDetails}>
                        <p>
                          <strong>{item.name}</strong> - ₹{item.price} x{" "}
                          {item.quantity} = ₹{item.price * item.quantity}
                        </p>

                        {/* ✅ Show Review Section for Delivered Orders */}
                        {order.status === "Delivered" &&
                        (editMode[item._id] || !feedbacks[item.name]) ? (
                          <div style={{ marginTop: "10px" }}>
                            <textarea
                              style={styles.reviewInput}
                              placeholder={`Write your review for ${item.name}...`}
                              value={reviews[item._id] || ""}
                              onChange={(e) =>
                                setReviews({
                                  ...reviews,
                                  [item._id]: e.target.value,
                                })
                              }
                            />
                            <div style={styles.starContainer}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    ...styles.star,
                                    color:
                                      star <= (ratings[item._id] || 0)
                                        ? "#ff9800"
                                        : "#ccc",
                                  }}
                                  onClick={() =>
                                    handleRatingClick(item._id, star)
                                  }
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <button
                              style={styles.submitBtn}
                              onClick={() =>
                                handleReviewSubmit(item._id, item.name)
                              }
                            >
                              {feedbacks[item.name]
                                ? "Update Review"
                                : "Submit Review"}
                            </button>
                          </div>
                        ) : order.status === "Delivered" &&
                          feedbacks[item.name] ? (
                          <div style={{ marginTop: "10px" }}>
                            <p>
                              <strong>Previous Review:</strong>{" "}
                              {feedbacks[item.name].review}
                            </p>
                            <p>
                              <strong>Rating:</strong> ⭐{" "}
                              {feedbacks[item.name].rating}/5
                            </p>
                            <button
                              style={styles.submitBtn}
                              onClick={() =>
                                handleEditReview(item._id, item.name)
                              }
                            >
                              Edit Review
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
