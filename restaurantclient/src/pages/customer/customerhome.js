import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbarcustomer';
const CustomerHome = () => {
    return (
        <div className="customer-home">
            <header className="customer-home-header">
                <h1>Welcome to Our Restaurant</h1>
                <p>Delicious food, delivered to your table!</p>
            </header>
            <Navbar />
            
            <section className="customer-home-content">
                <h2>Today's Specials</h2>
                <div className="specials">
                    <div className="special-item">
                        <h3>Grilled Salmon</h3>
                        <p>Freshly grilled salmon served with a side of vegetables.</p>
                    </div>
                    <div className="special-item">
                        <h3>Classic Cheeseburger</h3>
                        <p>Juicy beef patty with melted cheese, lettuce, and tomato.</p>
                    </div>
                    <div className="special-item">
                        <h3>Margherita Pizza</h3>
                        <p>Classic pizza topped with fresh mozzarella and basil.</p>
                    </div>
                </div>
            </section>
            <footer className="customer-home-footer">
                <p>&copy; {new Date().getFullYear()} Our Restaurant. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CustomerHome;