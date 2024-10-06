import Ticket from "@/Models/ticketModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  const allTickets = await Ticket.find();

  return NextResponse.json(allTickets, { status: 201 });
};
