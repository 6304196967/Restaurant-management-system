import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(
          `https://restaurant-management-backend-1.onrender.com/api/order/allorders?email=${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);

        // ✅ Fetch feedbacks after fetching orders
        await fetchFeedbacks(email, data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Fetch feedbacks for all orders
  const fetchFeedbacks = async (email, orders) => {
    try {
      const feedbackMap = {};

      for (const order of orders) {
        for (const item of order.items) {
          const response = await fetch(
            `https://restaurant-management-backend-1.onrender.com/api/feedback/getfeedbacks?email=${email}&orderId=${order._id}&itemName=${item.name}`
          );

          if (response.ok) {
            const feedbackData = await response.json();
            feedbackMap[`${item.name}_${order._id}`] = {
              review: feedbackData.feedback,
              rating: feedbackData.rating,
              orderId: order._id,
            };
          }
        }
      }

      setFeedbacks(feedbackMap);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // ✅ Submit or Update Review
  const handleReviewSubmit = async (itemId, itemName, orderId) => {
    const review =
      reviews[itemId] || feedbacks[`${itemName}_${orderId}`]?.review || "";
    const rating =
      ratings[itemId] || feedbacks[`${itemName}_${orderId}`]?.rating || 0;

    if (!review || !rating) {
      Swal.fire({
        icon: "warning",
        title: `Please enter both review and rating for ${itemName}! 🌟`,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://restaurant-management-backend-1.onrender.com/api/feedback/addfeedback`,
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
            orderId: orderId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review.");
      }

      Swal.fire({
        icon: "success",
        title: feedbacks[`${itemName}_${orderId}`]
          ? `Review updated successfully for ${itemName}! 🎉`
          : `Thank you for your feedback on ${itemName}! 🎉`,
      });

      // ✅ Refresh feedbacks after submission
      await fetchFeedbacks(localStorage.getItem("email"), orders);
      setEditMode({ ...editMode, [itemId]: false });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  // ✅ Cancel Order Function
  const handleCancelOrder = async (orderId) => {
    const email = localStorage.getItem("email");

    const result = await Swal.fire({
      title: "Are you sure? 🤔",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it! ❌",
      cancelButtonText: "No, keep it ✅",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://restaurant-management-backend-1.onrender.com/api/order/cancel/${orderId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              orderId: orderId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to cancel order.");
        }

        Swal.fire("Cancelled!", "Your order has been cancelled. 🛑", "success");

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "Cancelled" } : order
          )
        );
      } catch (error) {
        console.error("Error cancelling order:", error);
        Swal.fire("Error!", "Something went wrong. Try again later.", "error");
      }
    } else {
      Swal.fire("Order not Cancelled ✅", "Your order is safe!", "info");
    }
  };

  // ✅ Delete Review Function
  const handleDeleteReview = async (itemName, orderId) => {
    try {
      const email = localStorage.getItem("email");

      const result = await Swal.fire({
        title: `Are you sure? ❗`,
        text: `Do you want to delete the review for ${itemName}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it! 🗑️",
        cancelButtonText: "No, keep it ✅",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `https://restaurant-management-backend-1.onrender.com/api/feedback/deletefeedback?email=${email}&orderId=${orderId}&itemName=${itemName}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete review.");
        }

        Swal.fire(
          "Deleted!",
          `Review for ${itemName} has been deleted successfully. 🗑️`,
          "success"
        );

        // ✅ Refresh feedbacks after deletion
        const updatedFeedbacks = { ...feedbacks };
        delete updatedFeedbacks[`${itemName}_${orderId}`];
        setFeedbacks(updatedFeedbacks);
      } else {
        Swal.fire("Cancelled", "Your review is safe! ✅", "info");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
    }
  };

  // 🌟 Handle Star Rating
  const handleRatingClick = (itemId, star) => {
    setRatings({
      ...ratings,
      [itemId]: star,
    });
  };

  // 🎉 SweetAlert for Viewing Details
  const toggleOrderDetails = (order) => {
    Swal.fire({
      title: "Order Details 📦",
      html: `
        <div style="text-align: left;">
          <p><strong>Total:</strong> ₹${order.totalPrice}</p>
          <p><strong>Order Date:</strong> ${new Date(
            order.orderDate
          ).toLocaleString()}</p>
          <p><strong>Customer Name:</strong> ${
            order.customerDetails.firstName
          } ${order.customerDetails.lastName}</p>
          <p><strong>Phone Number:</strong> ${
            order.customerDetails.phoneNumber
          }</p>
          <p><strong>Address:</strong> ${
            order.customerDetails.houseNo
          }, ${order.customerDetails.street}, ${
            order.customerDetails.mandal
          }, ${order.customerDetails.district}, ${
            order.customerDetails.pincode
          }</p>
          <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
          <hr />
          <strong>Items:</strong>
          <ul style="padding-left: 20px; list-style-type: none;">
            ${order.items
              .map(
                (item) => `
              <li>
                <strong>${item.name}</strong> - ₹${item.price} x ${
                  item.quantity
                } = ₹${item.price * item.quantity}
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `,
      confirmButtonText: "Close ❌",
    });
  };

  // 🎨 Updated Styles
  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#f4f4f9",
      minHeight: "100vh",
    },
    header: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    orderList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: 0,
      margin: "0 auto",
      maxWidth: "800px",
    },
    orderItem: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    orderDate: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "14px",
      color: "#777",
    },
    itemContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px 0",
      width: "100%",
    },
    itemImage: {
      width: "60px",
      height: "60px",
      borderRadius: "5px",
      objectFit: "cover",
    },
    itemInfo: {
      display: "flex",
      flexDirection: "column",
    },
    statusBadge: {
      padding: "8px 12px",
      borderRadius: "15px",
      fontSize: "14px",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
      width: "100px",
      textAlign: "center",
    },
    pending: { backgroundColor: "#ffc107" },
    delivered: { backgroundColor: "#28a745" },
    cancelled: { backgroundColor: "#dc3545" },
    confirmed: { backgroundColor: "#17a2b8" },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "10px",
      gap: "10px",
    },
    btnContainer1: {
      display: "flex",
      marginTop: "10px",
      gap: "10px",
    },
    cancelBtn: {
      backgroundColor: "#dc3545",
      color: "#fff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    viewBtn: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    reviewInput: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    starContainer: {
      display: "flex",
      gap: "5px",
      marginBottom: "10px",
    },
    star: {
      fontSize: "20px",
      cursor: "pointer",
    },
    submitBtn: {
      backgroundColor: "#28a745",
      color: "#fff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    
    // Edit Review Button Style
    editReviewBtn: {
      backgroundColor: "#ffc107", // Yellow color for Edit
      color: "#fff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    },
    editReviewBtnHover: {
      backgroundColor: "#e0a800", // Darker yellow on hover
    },
  
    // Delete Review Button Style
    deleteReviewBtn: {
      backgroundColor: "#dc3545", // Red color for Delete
      color: "#fff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
    
    },
    deleteReviewBtnHover: {
      backgroundColor: "#c82333", // Darker red on hover
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
              <span style={styles.orderDate}>
                {new Date(order.orderDate).toLocaleDateString()}
              </span>
              <span
                style={{
                  ...styles.statusBadge,
                  ...(order.status === "Pending"
                    ? styles.pending
                    : order.status === "Delivered"
                    ? styles.delivered
                    : order.status === "Cancelled"
                    ? styles.cancelled
                    : styles.confirmed),
                }}
              >
                {order.status}
              </span>

              {order.items.map((item) => {
                const feedbackKey = `${item.name}_${order._id}`;
                const existingReview =
                  feedbacks[feedbackKey]?.review || "";
                const existingRating =
                  feedbacks[feedbackKey]?.rating || 0;

                return (
                  <div key={item._id} style={styles.itemContainer}>
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      style={styles.itemImage}
                    />
                    <div style={styles.itemInfo}>
                      <strong>{item.name}</strong>
                      <p>
                        ₹{item.price} x {item.quantity} = ₹
                        {item.price * item.quantity}
                      </p>
                    </div>

                    {/* 🎉 Review Section for Delivered Orders */}
                    {order.status === "Delivered" && (
                      <div style={{ marginTop: "10px" }}>
                        {editMode[item._id] ? (
                          <>
                            <textarea
                              style={styles.reviewInput}
                              value={reviews[item._id] || existingReview}
                              onChange={(e) =>
                                setReviews({
                                  ...reviews,
                                  [item._id]: e.target.value,
                                })
                              }
                              placeholder={`Write a review for ${item.name}`}
                            />
                            <div style={styles.starContainer}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    ...styles.star,
                                    color:
                                      star <=
                                      (ratings[item._id] || existingRating)
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
                                handleReviewSubmit(
                                  item._id,
                                  item.name,
                                  order._id
                                )
                              }
                            >
                              {existingReview
                                ? "Update Review"
                                : "Submit Review"}
                            </button>
                          </>
                        ) : (
                          <>
                            {existingReview ? (
                              <>
                                <p>
                                  <strong>Review:</strong> {existingReview}
                                </p>
                                <p>
                                  <strong>Rating:</strong>{" "}
                                  {"⭐".repeat(existingRating) +
                                    "☆".repeat(5 - existingRating)}
                                </p>
                                <div style={styles.btnContainer1}>
                                <button
                                  style={{
                                    ...styles.submitBtn,
                                    backgroundColor: "#ffc107",
                                  }}
                                  onClick={() =>
                                    setEditMode({
                                      ...editMode,
                                      [item._id]: true,
                                    })
                                  }
                                >
                                  Edit Review ✏️
                                </button>
                                <button
                                  style={{
                                    ...styles.submitBtn,
                                    backgroundColor: "#dc3545",
                                  }}
                                  onClick={() =>
                                    handleDeleteReview(
                                      item.name,
                                      order._id
                                    )
                                  }
                                >
                                  Delete Review 🗑️
                                </button>
                              </div>
                              </>
                            ) : (
                              <button
                                style={styles.submitBtn}
                                onClick={() =>
                                  setEditMode({
                                    ...editMode,
                                    [item._id]: true,
                                  })
                                }
                              >
                                Add Review ✨
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={styles.btnContainer}>
                {order.status === "Pending" && (
                  <button
                    style={styles.cancelBtn}
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order ❌
                  </button>
                )}
                <button
                  style={styles.viewBtn}
                  onClick={() => toggleOrderDetails(order)}
                >
                  View Details 🔍
                </button>
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
