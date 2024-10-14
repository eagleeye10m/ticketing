import { connectToDB } from "@/lib/dbConfig";
import Ticket from "@/Models/ticketModel";
import User from "@/Models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  await connectToDB();
  const ticket = await Ticket.findById(params.ticketId);
  if (!ticket) {
    return NextResponse.json({ message: "No Ticket found" }, { status: 404 });
  }

  const userId = await req.headers.get("x-user-id");
  const user = await User.findById(userId);

  if (ticket.user.toString() !== userId && !user.isAdmin && !user.isStaff) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 400 });
  }
  return NextResponse.json(ticket, { status: 201 });
};

export const PUT = async (req, { params }) => {
  await connectToDB();
  const ticket = await Ticket.findById(params.ticketId);
  if (!ticket) {
    return NextResponse.json({ message: "No Ticket found" }, { status: 404 });
  }

  const userId = await req.headers.get("x-user-id");
  const user = await User.findById(userId);
  if (ticket.user.toString() !== userId && !user.isAdmin && !user.isStaff) {
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }

  const status = await req.json();

  const updatedTicket = await Ticket.findByIdAndUpdate(
    params.ticketId,
    status,
    {
      new: true,
    }
  );

  return NextResponse.json(updatedTicket, { status: 201 });
};
