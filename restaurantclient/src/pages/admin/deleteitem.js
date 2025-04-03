import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState(""); // Added type dropdown
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();

        if (!type) {
            alert("Please select an item type.");
            return;
        }

        const requestData = {
            name,
            price: parseInt(price), // Convert price to integer
            type, // Include type in request
        };

        try {
            const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/menu/deleteitem", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Item deleted successfully!");
                console.log("Deleted item:", data);

                // Reset form
                setName("");
                setPrice("");
                setType("");
                navigate("/admin/menu");
            } else {
                alert(data.message || "Failed to delete item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Network error occurred.");
        }
    };

    return (
        <div className="delete-item-container">
            <h2 className="delete-item-title">Delete Dish</h2>
            <form className="delete-item-form" onSubmit={handleDelete}>
                
                <div className="form-group">
                    <label>Dish Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
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
                <button className="delete-button" type="submit">Delete Dish</button>
            </form>
            <button className="menu-btn" onClick={() => navigate("/admin/menu")}>Back to menu</button>
        </div>
    );
}
