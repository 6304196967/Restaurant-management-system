import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
import RoyalFeastLoader from "./RoyalFeastLoader";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

// 🎨 Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(252, 128, 25, 0.5); }
  50% { box-shadow: 0 0 20px rgba(252, 128, 25, 0.8); }
  100% { box-shadow: 0 0 5px rgba(252, 128, 25, 0.5); }
`;

// 🍔 Styled components with enhanced theme
const Container = styled.div`
  background: linear-gradient(135deg, #fff5f0 0%, #fff 100%);
  min-height: 100vh;
  padding: 1rem;  // Reduced from 2rem
  font-family: "Poppins", sans-serif;
`;

const Header = styled.h1`
  font-size: 2.2rem;  // Reduced from 2.8rem
  font-weight: 800;
  margin: 1rem 0 1.5rem;  // Reduced from 2rem 0 3rem
  text-align: center;
  color: #282c3f;
  position: relative;
  margin-top: 3rem;  // Reduced from 5rem
  animation: ${fadeIn} 0.6s ease-out;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  &::after {
    content: "";
    display: block;
    width: 80px;  // Reduced from 100px
    height: 4px;  // Reduced from 5px
    background: linear-gradient(90deg, #fc8019, #ff4f64);
    margin: 0.8rem auto 0;  // Reduced from 1rem auto 0
    border-radius: 3px;
    animation: ${pulse} 2s infinite;
  }
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
  margin: 0 auto;
  max-width: 900px;
`;

const OrderItem = styled.li`
  position: relative;
  border-radius: 14px;
  padding: 1.2rem;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(40, 44, 63, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: ${fadeIn} 0.4s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1}s;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(40, 44, 63, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    border-radius: 16px 0 0 16px;
    background: ${props => 
      props.status === "Pending" ? "linear-gradient(to bottom, #ffa700, #ffcc00)" :
      props.status === "Delivered" ? "linear-gradient(to bottom, #60b246, #8bc34a)" :
      props.status === "Cancelled" ? "linear-gradient(to bottom, #ff4f64, #ff7675)" : 
      "linear-gradient(to bottom, #5d8ed5, #64b5f6)"};
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e9e9eb;
`;

const OrderDate = styled.span`
  font-size: 0.9rem;
  color: #93959f;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.03);
  padding: 0.5rem 1rem;
  border-radius: 20px;
`;

const StatusBadge = styled.span`
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(30deg);
  }

  background: ${props => 
    props.status === "Pending" ? "linear-gradient(135deg, #ffa700, #ffcc00)" :
    props.status === "Delivered" ? "linear-gradient(135deg, #60b246, #8bc34a)" :
    props.status === "Cancelled" ? "linear-gradient(135deg, #ff4f64, #ff7675)" : 
    "linear-gradient(135deg, #5d8ed5, #64b5f6)"};
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  border-bottom: 1px dashed #e9e9eb;
  transition: all 0.3s ease;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(5px);
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    
    img {
      transform: scale(1.1);
    }
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: #282c3f;
  margin: 0;
  transition: all 0.2s ease;
  position: relative;
  display: inline-block;

  &:hover {
    color: #fc8019;
    
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #fc8019;
    transition: width 0.3s ease;
  }
`;

const ItemPrice = styled.p`
  font-size: 1rem;
  color: #7e808c;
  margin: 0;
  font-weight: 500;
`;

const ReviewSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(to right, #f8f8f8, #fff);
  border-radius: 12px;
  border-left: 4px solid #fc8019;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);

  &:hover {
    box-shadow: inset 0 0 0 2px rgba(252, 128, 25, 0.2),
                inset 0 0 10px rgba(0, 0, 0, 0.05);
  }
`;

const ReviewTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 700;
  color: #282c3f;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &::before {
    content: "✍️";
    font-size: 1.4rem;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.1));
  }
`;

const ReviewInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #d4d5d9;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #fc8019;
    box-shadow: 0 0 0 3px rgba(252, 128, 25, 0.2),
                inset 0 1px 3px rgba(0, 0, 0, 0.05);
  }
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const Star = styled.span`
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.active ? "#ffb800" : "#d4d5d9"};
  text-shadow: ${props => props.active ? "0 0 10px rgba(255, 184, 0, 0.5)" : "none"};
  position: relative;

  &:hover {
    transform: scale(1.3);
    animation: ${bounce} 0.5s;
  }

  &::after {
    content: "${props => props.starValue}";
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: ${props => props.active ? "#ffb800" : "#d4d5d9"};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #60b246, #8bc34a);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #4d9a34, #7cb342);
    box-shadow: 0 6px 15px rgba(96, 178, 70, 0.4);
  }

  &::after {
    content: "→";
    opacity: 0;
    transition: all 0.2s ease;
    display: inline-block;
    transform: translateX(-10px);
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const EditReviewButton = styled(Button)`
  background: linear-gradient(135deg, #fc8019, #ff9a44);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #e67317, #fc8019);
    box-shadow: 0 6px 15px rgba(252, 128, 25, 0.4);
  }
`;

const DeleteReviewButton = styled(Button)`
  background: linear-gradient(135deg, #ff4f64, #ff7675);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #e43f52, #ff4f64);
    box-shadow: 0 6px 15px rgba(255, 79, 100, 0.4);
  }
`;

const CancelButton = styled(Button)`
  background: linear-gradient(135deg, #ff4f64, #ff7675);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #e43f52, #ff4f64);
    box-shadow: 0 6px 15px rgba(255, 79, 100, 0.4);
  }
`;

const ViewButton = styled(Button)`
  background: linear-gradient(135deg, #282c3f, #4a4e69);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #1a1c29, #282c3f);
    box-shadow: 0 6px 15px rgba(40, 44, 63, 0.4);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const ButtonContainer1 = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #282c3f;
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #60b246;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const RatingText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #282c3f;
  font-weight: 600;
  padding: 0.8rem 1rem;
  background: white;
  border-radius: 8px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
`;

const NoOrders = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 3rem auto;
  animation: ${fadeIn} 0.6s ease-out;

  p {
    font-size: 1.3rem;
    color: #7e808c;
    margin-bottom: 2rem;
  }

  img {
    width: 200px;
    margin-bottom: 1.5rem;
    animation: ${pulse} 3s infinite;
  }
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px dashed #e9e9eb;

  span {
    font-size: 1.2rem;
    font-weight: 700;
    color: #282c3f;
  }

  .amount {
    font-size: 1.4rem;
    color: #60b246;
  }
`;
const MyOrders = () => {
  const navigate = useNavigate();
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

        // Fetch feedbacks after fetching orders
        await fetchFeedbacks(email, data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

      // Refresh feedbacks after submission
      await fetchFeedbacks(localStorage.getItem("email"), orders);
      setEditMode({ ...editMode, [itemId]: false });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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

        // Refresh feedbacks after deletion
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

  const handleRatingClick = (itemId, star) => {
    setRatings({
      ...ratings,
      [itemId]: star,
    });
  };

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


  return (
    <Container>
      <Navbar />
      <Header>
        My Orders
      </Header>
      {loading ? (
        <RoyalFeastLoader />
      ) : orders.length > 0 ? (
        <OrderList>
          {orders.map((order, index) => (
            <OrderItem key={order._id} status={order.status} index={index}>
              <OrderHeader>
                <StatusBadge status={order.status}>
                  {order.status === "Pending" && "⏳"}
                  {order.status === "Delivered" && "✓"}
                  {order.status === "Cancelled" && "✕"}
                  {order.status}
                </StatusBadge>
                <OrderDate>
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </OrderDate>
              </OrderHeader>

              {order.items.map((item) => {
                const feedbackKey = `${item.name}_${order._id}`;
                const existingReview = feedbacks[feedbackKey]?.review || "";
                const existingRating = feedbacks[feedbackKey]?.rating || 0;

                return (
                  <ItemContainer key={item._id}>
                    <ItemImage>
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    </ItemImage>
                    <ItemInfo>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </ItemPrice>
                    </ItemInfo>

                    {/* Review Section for Delivered Orders */}
                    {order.status === "Delivered" && (
                      <ReviewSection>
                        {editMode[item._id] ? (
                          <>
                            <ReviewTitle>
                              {existingReview ? "Edit Your Review" : "Add Your Review"}
                            </ReviewTitle>
                            <ReviewInput
                              value={reviews[item._id] || existingReview}
                              onChange={(e) =>
                                setReviews({
                                  ...reviews,
                                  [item._id]: e.target.value,
                                })
                              }
                              placeholder={`Share your experience with ${item.name}...`}
                            />
                            <StarContainer>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  active={star <= (ratings[item._id] || existingRating)}
                                  onClick={() => handleRatingClick(item._id, star)}
                                  starValue={star}
                                >
                                  ★
                                </Star>
                              ))}
                            </StarContainer>
                            <SubmitButton
                              onClick={() =>
                                handleReviewSubmit(item._id, item.name, order._id)
                              }
                            >
                              {existingReview ? "Update Review" : "Submit Review"}
                            </SubmitButton>
                          </>
                        ) : (
                          <>
                            {existingReview ? (
                              <>
                                <ReviewTitle>Your Review</ReviewTitle>
                                <ReviewText>{existingReview}</ReviewText>
                                <RatingText>
                                  Rating:{" "}
                                  <span style={{ color: "#ffb800" }}>
                                    {"★".repeat(existingRating) +
                                      "☆".repeat(5 - existingRating)}
                                  </span>
                                </RatingText>
                                <ButtonContainer1>
                                  <EditReviewButton
                                    onClick={() =>
                                      setEditMode({
                                        ...editMode,
                                        [item._id]: true,
                                      })
                                    }
                                  >
                                    ✏️ Edit Review
                                  </EditReviewButton>
                                  <DeleteReviewButton
                                    onClick={() =>
                                      handleDeleteReview(item.name, order._id)
                                    }
                                  >
                                    🗑️ Delete Review
                                  </DeleteReviewButton>
                                </ButtonContainer1>
                              </>
                            ) : (
                              <EditReviewButton
                                onClick={() =>
                                  setEditMode({
                                    ...editMode,
                                    [item._id]: true,
                                  })
                                }
                              >
                                ✍️ Add Review
                              </EditReviewButton>
                            )}
                          </>
                        )}
                      </ReviewSection>
                    )}
                  </ItemContainer>
                );
              })}

              <OrderTotal>
                <span>Order Total:</span>
                <span className="amount">₹{order.totalPrice}</span>
              </OrderTotal>

              <ButtonContainer>
                {order.status === "Pending" && (
                  <CancelButton
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    ❌ Cancel Order
                  </CancelButton>
                )}
                <ViewButton
                  onClick={() => toggleOrderDetails(order)}
                >
                  🔍 View Details
                </ViewButton>
              </ButtonContainer>
            </OrderItem>
          ))}
        </OrderList>
      ) : (
        <NoOrders>
          <img src="/empty-orders.svg" alt="No orders" />
          <p>You haven't placed any orders yet.</p>
          <ViewButton onClick={() => navigate('/menu')}>
            🍔 Browse Menu
          </ViewButton>
        </NoOrders>
      )}
    </Container>
  );
};

export default MyOrders;