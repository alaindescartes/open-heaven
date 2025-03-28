import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  tickets: { type: Number, required: true },
  ticketId: { type: String, required: true, unique: true },
  qrCode: { type: String }, // base64 string
  createdAt: { type: Date, default: Date.now },
  checkedIn: { type: Boolean, default: false },
checkedInCount: { type: Number, default: 0 },

  
 

});

export default mongoose.model("Ticket", ticketSchema);
