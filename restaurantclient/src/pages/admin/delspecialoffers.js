import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();
    const handleDelete = async (e) => {
        e.preventDefault();

        const requestData = { name, price: parseInt(price) }; // Convert price to integer

        try {
            const response = await fetch("https://restaurant-management-backend-1.onrender.com/api/spoffers/deleteitem", {
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
                navigate("/admin/specialoffers");
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
                <button className="delete-button" type="submit">Delete Dish</button>
            </form>
            <button className="menu-btn" onClick={() => navigate("/admin/specialoffers")}>Back to menu</button>
        </div>
    );
}
