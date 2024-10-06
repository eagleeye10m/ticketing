import { decFunc } from "./lib/JwtDecription";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // console.log("Request received at:", request.url);

  const authHeader = request.headers.get("authorization");
  // console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // console.log("No valid authorization header found.");
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await decFunc(token);

    // Set the user ID in the request headers for the API route

    // console.log("User ID added to headers:", decoded.id);

    const response = NextResponse.next();
    response.headers.set("x-user-id", decoded.id); //LOOKS LIKE THERE IS NO DIFFERENCE WITH THIS APPROACH

    return response;

    // const requestHeaders = new Headers(request.headers);
    //requestHeaders.set("x-user-id", decoded.id);
    // return NextResponse.next({                         //AND THIS ONE!
    //   request: {
    //     headers: requestHeaders,
    //   },
    //});
  } catch (error) {
    //console.log("JWT verification failed:", error.message);
    return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/tickets/:path*",
};
