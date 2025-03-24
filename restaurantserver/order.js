import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { order } from './db.js';

dotenv.config();

const orderRouter = Router();
const app = express();
app.use(express.json());
orderRouter.post("/additem", async (req, res) => {
  const { email, items, totalPrice } = req.body;

  // ✅ Basic validation
  if (!email || !items || items.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    // ✅ Create a new order
    const newOrder = new order({
      email, // ✅ Email from frontend
      items,
      totalPrice,
    });

    // ✅ Save order to DB
    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully!", order: newOrder });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ message: "Failed to place order" });
  }
});
 // 🚀 Fetch all orders API
 orderRouter.get("/allorders", async (req, res) => {
  const email = req.query.email; // ✅ Get email from query params
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const userOrders = await order.find({ email });
    res.status(200).json(userOrders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});



  
export default orderRouter;