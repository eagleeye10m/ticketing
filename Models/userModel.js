import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please Enter Name"],
    },
    password: {
      type: String,
      required: [true, "please Enter password"],
    },
    email: {
      type: String,
      required: [true, "please Enter email"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isStaff: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
