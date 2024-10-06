import { connectToDB } from "@/lib/dbConfig";
import Ticket from "@/Models/ticketModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectToDB();
  const userId = req.headers.get("X-User-Id");
  const tickets = await Ticket.find({ user: userId }).sort({ createdAt: -1 });
  return NextResponse.json(tickets, { status: 201 });
};
