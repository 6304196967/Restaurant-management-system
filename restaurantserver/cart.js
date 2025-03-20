import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { Cart } from './db.js';

dotenv.config();

const CartRouter = Router();
const app = express();
app.use(express.json());

CartRouter.post('/additem', async (req, res) => {
    // ✅ Updated schema to include 'image'
    const requiredBody = z.object({
        email: z.string().email(),
        name: z.string(),
        price: z.number().int(),
        quantity: z.number().int().min(1),
        image: z.string().url(), // ✅ Validate image URL
    });

    try {
        // Validate request body
        const { email, name, price, quantity, image } = requiredBody.parse(req.body);

        // Check if the user's cart exists
        let userCart = await Cart.findOne({ email });

        if (!userCart) {
            // ✅ If no cart exists, create a new one
            userCart = new Cart({
                email,
                items: [{ name, price, quantity, image }], // Include image in the item
                totalPrice: price * quantity,
            });
        } else {
            // ✅ Check if item already exists in the cart
            const existingItem = userCart.items.find((item) => item.name === name);

            if (existingItem) {
                // ✅ If item exists, update quantity and price
                existingItem.quantity += quantity;
            } else {
                // ✅ Otherwise, add new item with image
                userCart.items.push({ name, price, quantity, image });
            }

            // ✅ Update total price
            userCart.totalPrice = userCart.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
        }

        // ✅ Save the updated cart
        await userCart.save();

        res.status(200).json({ message: "Item added to cart", cart: userCart });
    } catch (error) {
        res.status(400).json({ error: error.errors || "Invalid request" });
    }
});

// ✅ Get cart items route
CartRouter.get('/cartitems', async (req, res) => {
    try {
        const { email } = req.query; // Use query parameters for GET
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const userCart = await Cart.findOne({ email });

        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        } else {
            res.status(200).json({ cart: userCart });
        }
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default CartRouter;
