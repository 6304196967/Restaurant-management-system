import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import { Menu } from './db.js';

dotenv.config();

const MenuRouter = Router();
const app = express();
app.use(express.json());

MenuRouter.post('/additem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
        image: z.string(),
        description: z.string(),
        type: z.string(),  // Added type field
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price, image, description, type } = req.body;
    try {
        await Menu.create({
            name,
            price,
            image,
            description,
            type,  // Added type field
        });

        res.status(201).json({ message: 'Menu Item Added Successfully' });

    } catch (e) {
        console.error("Menu Add Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

MenuRouter.get('/allitems', async (req, res) => {
    try {
        const allMenuItems = await Menu.find();
        res.status(200).json(allMenuItems);
    } catch (e) {
        console.error("Menu Fetch Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

MenuRouter.delete('/deleteitem', async (req, res) => {
    const requiredBody = z.object({
        name: z.string(),
        price: z.number().int(),
        type: z.string(),  // Added type field for deletion
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { name, price, type } = req.body;
    try {
        const deletedItem = await Menu.findOneAndDelete({ name, price, type });

        if (!deletedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: 'Menu Item Deleted Successfully' });

    } catch (e) {
        console.error("Menu Delete Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default MenuRouter;
