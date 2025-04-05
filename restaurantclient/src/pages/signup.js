import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    setIsSigningUp(true);

    try {
      const response = await fetch(
        "https://restaurant-management-backend-1.onrender.com/api/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            phonenumber: formData.phonenumber,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        const userData = await response.json();
        await Swal.fire("Signup Successful", "Welcome to Royal Feast!", "success");
        navigate("/");
      } else if (response.status === 400) {
        const errorData = await response.json();
        Swal.fire("Oops!", errorData.message || "User already exists", "warning");
      } else {
        Swal.fire("Signup Failed", "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Network Error", "Please try again later", "error");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonenumber">Phone number:</label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm password:</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            className={`signup-button ${isSigningUp ? "loading" : ""}`}
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="login-prompt">
          Already have an account?
          <Link to="/signin" className="login-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
