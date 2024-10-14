import { connectToDB } from "@/lib/dbConfig";
import Ticket from "@/Models/ticketModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async () => {
  await connectToDB();
  const allTickets = await Ticket.find().sort({ createdAt: -1 });

  return NextResponse.json(allTickets, { status: 201 });
};
