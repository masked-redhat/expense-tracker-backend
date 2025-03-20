import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    index: true,
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
});

const User = model("User", userSchema);

export default User;
