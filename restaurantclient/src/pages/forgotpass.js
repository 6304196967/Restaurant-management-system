import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forgotpass.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Dynamic message after sending link
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0); // Timer countdown

  const navigate = useNavigate();

  // Timer logic to enable button after 1 minute
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
      setMessage("");
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("Reset link sent! You can request again in 60 seconds.");
        setIsButtonDisabled(true);
        setCountdown(60); // Start the 60-second timer
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error occurred.");
    }
  };


  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">Reset Password</h2>
        <p className="forgot-password-description">
          Enter your email to receive a reset link.
        </p>

        {/* Show success or error message dynamically */}
        {message && <p className="status-message">{message}</p>}

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>

          {/* Button with dynamic state and countdown */}
          <button
            type="submit"
            className="submit-button"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled
              ? `Resend in ${countdown}s`
              : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login link */}
        <Link to="/" className="back-to-login-button">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
