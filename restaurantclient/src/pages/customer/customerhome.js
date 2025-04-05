import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbarcustomer';
import Footer from '../customer/Footer';
import Hero from './HeroSection';
import Specials from './Specials';
import MenuPreview from './MenuPreview';
import Testimonials from './Testimonials';
import '../../styles/customerhome.css';
const CustomerHome = () => {
    return (
        <div className="customer-home">
            
            <Navbar />
            
            <Hero />
            <Specials />
            <MenuPreview />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default CustomerHome;