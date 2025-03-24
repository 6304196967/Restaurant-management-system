import React from 'react';
import Navbar from './navbaradmin';
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

const AdminHome = () => (
    <div>
        <Navbar />
        <h1>{getGreeting()} {username}</h1>
        <h1>Welcome to the Admin Dashboard</h1>
        <p>Manage the restaurant operations and view reports!</p>
    </div>
);

export default AdminHome;