import { connectToDB } from "@/lib/dbConfig";
import Ticket from "@/Models/ticketModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const body = await req.formData();

    const { product, description, file } = Object.fromEntries(body.entries());

    // Get the user ID from the headers (set in middleware)
    const userId = req.headers.get("x-user-id");

    // Check if userId, product, and description are provided
    if (!userId) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    if (!product || !description) {
      return NextResponse.json(
        { message: "Please add both product and description" },
        { status: 400 }
      );
    }

    // Create the ticket
    const ticket = await Ticket.create({
      user: userId,
      product,
      description,
      status: "new",
    });

    // Return the created ticket
    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { message: "Error creating ticket" },
      { status: 500 }
    );
  }
};
