import { connectToDB } from "@/lib/dbConfig";
import User from "@/Models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  await connectToDB();
  const body = await req.json();

  const { name, email, password } = body;

  if (!name || !password || !email) {
    return new NextResponse("Fill all fields", { status: 400 });
  }
  //check user exist or not
  const userExist = await User.findOne({ email });

  if (userExist) {
    return new NextResponse("User Already exists", { status: 400 });
  }

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });
  if (user) {
    return new NextResponse(JSON.stringify(user), {
      status: 201,
      statusText: "user created successfully",
    });
  } else {
    return new NextResponse("Invalid user Data", { status: 400 });
  }
};
