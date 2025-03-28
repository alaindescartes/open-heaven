import Ticket from "../db/models/Ticket.js";
import QRCode from "qrcode";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
console.log("✅ EMAIL_USER:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS length:", process.env.EMAIL_PASS?.length);

// Configure Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const registerForEvent = async (req, res) => {
  const { firstName, lastName, email, phone, tickets } = req.body;

  try {
    // Check for existing registration by email
    const existing = await Ticket.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "You’ve already registered with this email." });
    }

    // Generate a unique ticket ID
    const ticketId = `TKT-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Generate QR Code
    const qrCode = await QRCode.toDataURL(ticketId);

    const qrCodeData = await QRCode.toDataURL(ticketId);
    const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, "");
    const qrCodeBuffer = Buffer.from(base64Data, "base64");

    // Save to MongoDB
    const newTicket = new Ticket({
      firstName,
      lastName,
      email,
      phone,
      tickets,
      ticketId,
      qrCode:qrCodeData,
    });

    await newTicket.save();

    // Send email with ticket and QR code
    const mailOptions = {
        from: `"Open Heavens Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "🎫 Your Open Heavens Event Ticket",
        html: `
          <p>Hi ${firstName},</p>
          <p>Thank you for registering for <strong>Open Heavens</strong>!</p>
          <p><strong>Ticket ID:</strong> ${ticketId}</p>
          <p>Show the QR code below at the event entrance:</p>
          <img src="cid:qrCodeImage" alt="QR Code" />
          <p>We look forward to seeing you!</p>
          <p>God bless,</p>
          <p><em>Open Heavens Team</em></p>
        `,
        attachments: [
          {
            filename: "ticket-qr.png",
            content: qrCodeBuffer,
            cid: "qrCodeImage", // 👈 this must match img src
          },
        ],
      };
      

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Ticket emailed successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};
