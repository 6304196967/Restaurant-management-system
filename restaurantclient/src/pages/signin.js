import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/signin.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      Swal.fire("Missing Fields", "Please enter both email and password", "warning");
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await fetch(
        "https://restaurant-management-backend-1.onrender.com/api/user/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);

        await Swal.fire("Login Successful!", `Welcome, ${data.username}!`, "success");

        if (data.email === "admin@gmail.com") {
          navigate("/admin");
        } else {
          navigate("/customer");
        }
      } else {
        Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Network Error", "Please check your connection", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>

        <div className="login-input-container">
          <label className="login-label" htmlFor="email">Email:</label>
          <input
            className="login-input"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-input-container">
          <label className="login-label" htmlFor="password">Password:</label>
          <input
            className="login-input"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          <button
            className={`login-button ${isLoggingIn ? "loading" : ""}`}
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
          <Link className="login-forgot-password" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <div className="login-signup-container">
          <p className="login-signup-text">
            Don't have an account?
            <Link to="/signup" className="login-signup-button">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
