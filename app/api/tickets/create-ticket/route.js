import { connectToDB } from "@/lib/dbConfig";
import Ticket from "@/Models/ticketModel";
import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import { put } from "@vercel/blob";
export const POST = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const body = await req.formData();
    const file = body.get("file");
    const { product, description } = Object.fromEntries(body.entries());
    const blob = await put(file.name, file, { access: "public" });
    console.log(blob);
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

    //   const jsonResponse = await handleUpload({
    //     body,
    //     request,
    //     onBeforeGenerateToken: async (pathname /*, clientPayload */) => {

    //       return {
    //         allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
    //         tokenPayload: JSON.stringify({
    //           // optional, sent to your server on upload completion
    //           // you could pass a user id from auth, or a value from clientPayload
    //         }),
    //       };
    //     },
    //     onUploadCompleted: async ({ blob, tokenPayload }) => {
    //       // Get notified of client upload completion
    //       // ⚠️ This will not work on `localhost` websites,
    //       // Use ngrok or similar to get the full upload flow

    //       console.log("blob upload completed", blob, tokenPayload);

    //       try {

    //       } catch (error) {
    //         throw new Error("Could not update user");
    //       }
    //     },
    //   });
    //
    // } catch (error) {}

    // Create the ticket
    const ticket = await Ticket.create({
      user: userId,
      product,
      description,
      status: "new",
      fileUrl: "blob.url",
    });

    return NextResponse.json(ticket, { status: 201 });
    // Return the created ticket
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { message: "Error creating ticket" },
      { status: 500 }
    );
  }
};
