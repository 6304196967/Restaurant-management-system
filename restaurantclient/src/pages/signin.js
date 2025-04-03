import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "../styles/signin.css";
    import { Link } from 'react-router-dom';

    export default function LoginPage() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const handleLogin = async () => {
        try {
            const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/user/signin", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem("token", data.token); 
                localStorage.setItem("email",data.email);  
                localStorage.setItem("username",data.username);           
    
                alert("Login successful");
    
                if (data.email === "admin@gmail.com") {
                    navigate("/Restaurant-management-system/admin");
                } 
                else {
                    navigate("/Restaurant-management-system/customer");}
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network error occurred");
        }
    };
    

      return (
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Welcome Back!</h2>
            <div className="login-input-container">
              <label className="login-label" htmlFor="email">
                Email:
              </label>
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
              <label className="login-label" htmlFor="password">
                Password:
              </label>
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
                className="login-button"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
              <Link className="login-forgot-password" to="/Restaurant-management-system/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="login-signup-container">
              <p className="login-signup-text">
                Don't have an account?
                <Link to="/Restaurant-management-system/signup" className="login-signup-button">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    }
