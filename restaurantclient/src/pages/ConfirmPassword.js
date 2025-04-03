import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ConfirmPassword.css";

const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        alert("Password successfully updated!");
        navigate("/Restaurant-management-system/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error occurred.");
    }
  };

  return (
    <div className="confirm-password-container">
      <div className="confirm-password-card">
        <h2 className="confirm-password-title">Set New Password</h2>
        <p className="confirm-password-description">Enter a new password for your account.</p>
        <form onSubmit={handleSubmit} className="confirm-password-form">
          <div className="form-group">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
