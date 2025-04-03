import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");  // New state for item type
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const requestData = {
            name,
            price: parseInt(price), 
            image,  
            description,
            type, // New field
        };
    
        try {
            const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/menu/additem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Item added successfully!");
                console.log("Item added:", data);
    
                // Reset form
                setName("");
                setPrice("");
                setImage("");
                setDescription("");
                setType(""); 
                navigate("/admin/menu");
            } else {
                alert(data.message || "Failed to add item.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            alert("Network error occurred.");
        }
    };

    return (
        <div className="add-item-container">
            <h2 className="add-item-title">Add New Dish</h2>
            <form className="add-item-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Dish Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select Item Type</option>
                        <option value="Starter">Starter</option>
                        <option value="Chicken">Chicken Item</option>
                        <option value="Mutton">Mutton Item</option>
                        <option value="IceCream">Ice Cream</option>
                        <option value="CoolDrink">Cool Drink</option>
                        <option value="Veg">Veg Item</option>
                    </select>
                </div>
                <button className="submit-button" type="submit">Add Dish</button>
            </form>
            <button className="menu-btn" onClick={() => navigate("/admin/menu")}>Back to menu</button>
        </div>
    );
}
