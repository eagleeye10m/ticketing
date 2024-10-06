import { connectToDB } from "@/lib/dbConfig";
import User from "@/Models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const POST = async (req) => {
  await connectToDB();

  const body = await req.json();
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return new NextResponse(
      JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
        token: generateToken(user._id),
      }),
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 }
    );
  }
};

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
