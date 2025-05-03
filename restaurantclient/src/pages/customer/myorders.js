import React, { useEffect, useState } from "react";
import Navbar from "./navbarcustomer";
import Swal from "sweetalert2";
import RoyalFeastLoader from "./RoyalFeastLoader";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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

// 🍔 Styled components with Swiggy theme
const Container = styled.div`
  background-color: #ffdccc;
  min-height: 100vh;
  padding: 2rem;
  font-family: "Poppins", sans-serif;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 3rem;
  text-align: center;
  color: #282c3f;
  position: relative;
  margin-top: 5rem;
  animation: ${fadeIn} 0.6s ease-out;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #fc8019, #ff4f64);
    margin: 0.5rem auto 0;
    border-radius: 2px;
    animation: ${pulse} 2s infinite;
  }
`;

const OrderList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0;
  margin: 0 auto;
  max-width: 800px;
`;

const OrderItem = styled.li`
  position: relative;
  border: 1px solid #e9e9eb;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0 1px 10px rgba(40, 44, 63, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: ${fadeIn} 0.4s ease-out;
  animation-fill-mode: both;
  animation-delay: ${props => props.index * 0.1}s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(40, 44, 63, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    border-radius: 12px 0 0 12px;
    background: ${props => 
      props.status === "Pending" ? "#ffa700" :
      props.status === "Delivered" ? "#60b246" :
      props.status === "Cancelled" ? "#ff4f64" : "#5d8ed5"};
  }
`;

const OrderDate = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.85rem;
  color: #93959f;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  width: fit-content;
  text-transform: capitalize;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => 
    props.status === "Pending" ? "#ffa700" :
    props.status === "Delivered" ? "#60b246" :
    props.status === "Cancelled" ? "#ff4f64" : "#5d8ed5"};
  animation: ${pulse} 2s infinite;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
  border-bottom: 1px dashed #e9e9eb;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateX(5px);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #f2f2f2;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const ItemName = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: #282c3f;
  margin: 0;
  transition: all 0.2s ease;

  &:hover {
    color: #fc8019;
  }
`;

const ItemPrice = styled.p`
  font-size: 0.95rem;
  color: #7e808c;
  margin: 0;
`;

const ReviewSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  border-left: 3px solid #fc8019;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: inset 0 0 0 2px rgba(252, 128, 25, 0.2);
  }
`;

const ReviewTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #282c3f;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "✍️";
    font-size: 1.2rem;
  }
`;

const ReviewInput = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border-radius: 6px;
  border: 1px solid #d4d5d9;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 80px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:focus {
    outline: none;
    border-color: #fc8019;
    box-shadow: 0 0 0 3px rgba(252, 128, 25, 0.2);
    transform: translateY(-2px);
  }
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Star = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.active ? "#ffb800" : "#d4d5d9"};
  text-shadow: ${props => props.active ? "0 0 8px rgba(255, 184, 0, 0.4)" : "none"};

  &:hover {
    transform: scale(1.3);
    animation: ${bounce} 0.5s;
  }
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #60b246;
  color: #fff;

  &:hover {
    background-color: #4d9a34;
    box-shadow: 0 4px 12px rgba(96, 178, 70, 0.3);
  }

  &::after {
    content: "→";
    opacity: 0;
    transition: all 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(5px);
  }
`;

const EditReviewButton = styled(Button)`
  background-color: #fc8019;
  color: #fff;

  &:hover {
    background-color: #e67317;
    box-shadow: 0 4px 12px rgba(252, 128, 25, 0.3);
  }
`;

const DeleteReviewButton = styled(Button)`
  background-color: #ff4f64;
  color: #fff;

  &:hover {
    background-color: #e43f52;
    box-shadow: 0 4px 12px rgba(255, 79, 100, 0.3);
  }
`;

const CancelButton = styled(Button)`
  background-color: #ff4f64;
  color: #fff;

  &:hover {
    background-color: #e43f52;
    box-shadow: 0 4px 12px rgba(255, 79, 100, 0.3);
  }
`;

const ViewButton = styled(Button)`
  background-color: #282c3f;
  color: #fff;

  &:hover {
    background-color: #1a1c29;
    box-shadow: 0 4px 12px rgba(40, 44, 63, 0.3);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.8rem;
`;

const ButtonContainer1 = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.8rem;
`;

const ReviewText = styled.p`
  font-size: 0.95rem;
  color: #282c3f;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  background-color: white;
  border-radius: 6px;
  border-left: 3px solid #60b246;
`;

const RatingText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #282c3f;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  background-color: white;
  border-radius: 6px;
  width: fit-content;
`;

const NoOrders = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #7e808c;
  margin-top: 3rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

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
              <OrderDate>
                {new Date(order.orderDate).toLocaleDateString()}
              </OrderDate>
              <StatusBadge status={order.status}>
                {order.status}
              </StatusBadge>

              {order.items.map((item) => {
                const feedbackKey = `${item.name}_${order._id}`;
                const existingReview = feedbacks[feedbackKey]?.review || "";
                const existingRating = feedbacks[feedbackKey]?.rating || 0;

                return (
                  <ItemContainer key={item._id}>
                    <ItemImage
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                    />
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
                                  {"★".repeat(existingRating) +
                                    "☆".repeat(5 - existingRating)}
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
                                    Edit Review
                                  </EditReviewButton>
                                  <DeleteReviewButton
                                    onClick={() =>
                                      handleDeleteReview(item.name, order._id)
                                    }
                                  >
                                    Delete Review
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
                                Add Review
                              </EditReviewButton>
                            )}
                          </>
                        )}
                      </ReviewSection>
                    )}
                  </ItemContainer>
                );
              })}

              <ButtonContainer>
                {order.status === "Pending" && (
                  <CancelButton
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </CancelButton>
                )}
                <ViewButton
                  onClick={() => toggleOrderDetails(order)}
                >
                  View Details
                </ViewButton>
              </ButtonContainer>
            </OrderItem>
          ))}
        </OrderList>
      ) : (
        <NoOrders>You haven't placed any orders yet.</NoOrders>
      )}
    </Container>
  );
};

export default MyOrders;