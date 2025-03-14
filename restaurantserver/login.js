import dotenv from 'dotenv';
import { Router } from 'express';
import express from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from './db.js';


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const UserRouter = Router();
const app = express();
app.use(express.json());

UserRouter.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        username : z.string(),
        email: z.string().min(10).max(100).email(),
        password: z.string().min(5).max(10)
            .regex(/\d/, "Password must contain at least one digit")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Invalid input data",
            errors: parsedBody.error.errors
        });
    }

    const { username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Signed Up Successfully' });

    } catch (e) {
        console.error("Signup Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
UserRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Incorrect Credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        
        const token = jwt.sign({ id: user._id.toString()}, JWT_SECRET);
        res.status(200).json({ token,email });
    } catch (e) {
        console.error("Signin Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


UserRouter.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User with this email does not exist" });
        }
        const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
        const transporter = nodemailer.createTransport({
            secure: true,
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {

            to: email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. <a href="http://localhost:3001/reset-password/${resetToken}">Click here</a> to reset your password. This link is valid for 15 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset link sent to email" });

    } catch (e) {
        console.error("Forgot Password Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
UserRouter.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body; // Ensure newPassword is received

        if (!token || !password) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Ensure newPassword is valid before hashing
        if (typeof password !== 'string' || password.trim() === "") {
            return res.status(400).json({ message: "Invalid password input" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // FIX: Ensure newPassword is valid

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (e) {
        console.error("Reset Password Error:", e);
        res.status(500).json({ message: "Invalid or expired token" });
    }
});

export default UserRouter;
