import Note from "@/Models/noteModel";
import Ticket from "@/Models/ticketModel";
import User from "@/Models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const userId = req.headers.get("x-user-id");
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const { ticketId } = params;

  const ticket = await Ticket.findById(ticketId);

  if (ticket.user.toString() !== userId && !user.isAdmin && !user.isStaff) {
    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 }
    );
  }

  const notes = await Note.find({ ticket: ticketId }).populate({
    path: "user",
    model: User,
    select: "_id name",
  });

  return NextResponse.json(notes, { status: 200 });
};

export const POST = async (req, { params }) => {
  const userId = req.headers.get("x-user-id");
  // Get user using the id in the JWT
  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const ticket = await Ticket.findById(params.ticketId);

  if (ticket.user.toString() !== userId && !user.isAdmin && !user.isStaff) {
    return NextResponse.json(
      { message: "User not authorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const note = await Note.create({
    text: JSON.stringify(body.text),
    isStaff: user.isAdmin || user.isStaff ? true : false,
    ticket: params.ticketId,
    user: userId,
  });

  const notes = await Note.find({ ticket: params.ticketId });

  if (ticket.status !== "closed") {
    const newStatus = notes.length ? "open" : "new";

    // Only update if the status has actually changed
    if (ticket.status !== newStatus) {
      await Ticket.findByIdAndUpdate(
        params.ticketId,
        { status: newStatus },
        { new: true }
      );
    }
  }

  return NextResponse.json(note, { status: 200 });
};
