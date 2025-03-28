import express from "express";
import jwt from "jsonwebtoken";
import Ticket from "../db/models/Ticket.js";

const router = express.Router();

//  Dummy credentials (replace with env vars later)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

//  Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });
    return res.json({ token });
  }
  return res.status(401).json({ message: "Invalid credentials" });
});
// ✅ Toggle check-in status for a ticket
router.put("/checkin/:ticketId", async (req, res) => {
    const { ticketId } = req.params;
    const { checkedIn, count } = req.body;
  
    try {
      const ticket = await Ticket.findOneAndUpdate(
        { ticketId },
        { checkedIn, checkedInCount: checkedIn ? count : 0 },
        { new: true }
      );
  
      if (!ticket) return res.status(404).json({ message: "Ticket not found" });
      res.json({ message: "Check-in status updated", ticket });
    } catch (err) {
      console.error("Check-in update error:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  
//  Middleware
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === "admin") return next();
    return res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

//  Get all registered users (admin only)
router.get("/registrations", verifyAdminToken, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch registrations" });
  }
});

export default router;
