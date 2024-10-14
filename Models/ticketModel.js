import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["iPhone", "Macbook Pro", "iMac", "iPad"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
    fileUrl: {
      type: String, // or an array of strings if multiple files are allowed
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket =
  mongoose.models?.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
