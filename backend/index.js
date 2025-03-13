import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRoutes);

// Port Configuration
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
