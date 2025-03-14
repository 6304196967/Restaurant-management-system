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
    const requiredBody = z.object({
        email: z.string().email(), 
        name: z.string(),
        price: z.number().int(),
        quantity: z.number().int().min(1),
    });

    try {
        // Validate request body
        const { email, name, price, quantity } = requiredBody.parse(req.body);

        // Check if the user's cart exists
        let userCart = await Cart.findOne({ email });

        if (!userCart) {
            // If no cart exists, create a new one
            userCart = new Cart({
                email,
                items: [{ name, price, quantity }],
                totalPrice: price * quantity
            });
        } else {
            // Check if item already exists in the cart
            const existingItem = userCart.items.find(item => item.name === name);

            if (existingItem) {
                // If item exists, update quantity and price
                existingItem.quantity += quantity;
            } else {
                // Otherwise, add new item
                userCart.items.push({ name, price, quantity });
            }

            // Update total price
            userCart.totalPrice = userCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        // Save the updated cart
        await userCart.save();

        res.status(200).json({ message: "Item added to cart", cart: userCart });
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
});

export default CartRouter;
