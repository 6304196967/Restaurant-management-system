import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({}); // To store quantity for each item

    // Get email from localStorage
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/menu/allitems");
                if (!response.ok) {
                    throw new Error("Failed to fetch menu items");
                }
                const data = await response.json();
                setMenuItems(data);

                // Initialize quantities state for each item
                const initialQuantities = {};
                data.forEach(item => {
                    initialQuantities[item.name] = 1; // Default quantity = 1
                });
                setQuantities(initialQuantities);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) return <p>Loading menu...</p>;
    if (error) return <p>Error: {error}</p>;

    // Function to update quantity for an item
    const handleQuantityChange = (itemName, value) => {
        const newQuantity = Math.max(1, Number(value)); // Ensure minimum is 1
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemName]: newQuantity,
        }));
    };

    // Function to handle adding an item to the cart
    const handleAddToCart = async (item) => {
        if (!userEmail) {
            alert("User email not found. Please log in.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/cart/additem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    name: item.name,
                    price: item.price,
                    quantity: quantities[item.name] || 1, // Get quantity from state
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add item to cart");
            }

            alert(`${item.name} (${quantities[item.name]}x) added to cart!`);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="menu-container">
            <h2 className="menu-title">Our Menu</h2>
            <div className="menu-grid">
                {menuItems.map((item, index) => (
                    <div className="menu-card" key={item.id || index}>
                        <img src={item.image} alt={item.name} className="menu-image" />
                        <h3 className="menu-name">{item.name}</h3>
                        <p className="menu-price">₹{item.price}</p>
                        <p className="menu-description">{item.description}</p>
                        
                        {/* Quantity Input */}
                        <div className="quantity-container">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                min="1"
                                value={quantities[item.name] || 1}
                                onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                                className="quantity-input"
                            />
                        </div>

                        {/* Add to Cart Button */}
                        <button className="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
