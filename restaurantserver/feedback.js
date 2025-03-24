import dotenv from "dotenv";
import { Router } from "express";
import express from "express";
import { Feedback } from "./db.js"; // ✅ Correct import

dotenv.config();

const feedbackRouter = Router();
const app = express();
app.use(express.json());

// ✅ Add or Update Feedback
feedbackRouter.post("/addfeedback", async (req, res) => {
  const { email, feedback, rating, itemName } = req.body;

  // ✅ Basic validation
  if (!email || !feedback || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Invalid feedback data" });
  }

  try {
    // ✅ Check if the feedback already exists
    const existingFeedback = await Feedback.findOne({ email, itemName });

    if (existingFeedback) {
      // ✅ Update existing feedback if found
      existingFeedback.feedback = feedback;
      existingFeedback.rating = rating;
      await existingFeedback.save();
      return res.status(200).json({
        message: "Feedback updated successfully!",
        feedback: existingFeedback,
      });
    } else {
      // ✅ Create new feedback if not found
      const newFeedback = new Feedback({
        email,
        feedback,
        rating,
        itemName,
      });

      // ✅ Save feedback to DB
      await newFeedback.save();
      res.status(201).json({
        message: "Feedback added successfully!",
        feedback: newFeedback,
      });
    }
  } catch (err) {
    console.error("Feedback add error:", err);
    res.status(500).json({ message: "Failed to add or update feedback" });
  }
});

// ✅ Get feedbacks based on email
feedbackRouter.get("/getfeedbacks", async (req, res) => {
  const { email } = req.query;
  try {
    const feedbacks = await Feedback.find({ email });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
});

export default feedbackRouter;
