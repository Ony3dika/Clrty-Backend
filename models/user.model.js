import mongoose from "mongoose";

// Defining field attributes for user
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: { true: "First name is required" },
      trim: true,
      minLength: 2,
      maxLength: 15,
    },
    last_name: {
      type: String,
      required: { true: "Last name is required" },
      trim: true,
      minLength: 2,
      maxLength: 15,
    },
    email: {
      type: String,
      required: { true: "Email is required" },
      trim: true,
      unique: true,
      lowercase: true,
      minLength: 5,
      maxLength: 50,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    // avatar: {
    //   type: String, // e.g. Cloudinary or S3 image URL
    //   default: "", // or provide a default image URL
    // },
    password: {
      type: String,
      required: { true: "Password is required" },
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
