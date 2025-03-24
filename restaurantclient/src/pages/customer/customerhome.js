import React from 'react';
import Navbar from "./navbarcustomer";
const username = localStorage.getItem('username');

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
        return 'Good Morning';
    } else if (currentHour < 18) {
        return 'Good Afternoon';
    } else {
        return 'Good Evening';
    }
};

const CustomerHome = () => (
    <div>
        <Navbar />
        <h1>{getGreeting()} {username}</h1>
        <h1>Welcome to the Restaurant</h1>
        <p>Explore our menu and place your order!</p>
    </div>
);

export default CustomerHome;