import { jwtVerify } from "jose";

export const decFunc = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);

    // console.log("Decoded JWT:", payload);

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
};
