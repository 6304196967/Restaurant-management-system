import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar"; // Import Navbar
import "../styles/Home.css"; // Import Home.css for styling

function Home() {
  const navigate = useNavigate(); 
  const handleExploreMenu = () => {
    navigate("/signin"); 
  };
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
      <h2>The Best Tasting Experience!</h2>
        <h1>Elevate Your Inner Foodie with Every Bite.</h1>
        <p>
          Indulge in a symphony of flavors crafted with passion. Experience a
          delightful journey through exquisite dishes that awaken your senses
          and leave you craving for more.
        </p>
        <button className="explore-btn" onClick={handleExploreMenu}>Sign In</button>
      </div>
    </div>
  );
}

export default Home;