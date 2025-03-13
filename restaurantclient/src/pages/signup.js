import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    username: "",
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
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const userData = await response.json(); 
      
        alert("Signup successful");
        navigate("/");
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.message || "User already exists");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error occurred");
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

        
          <button className="signup-button" type="submit">
            Sign Up
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