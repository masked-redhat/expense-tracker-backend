import bcryptjs from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: {
    type: String,
    required: true,
    set: (v) => bcryptjs.hashSync(v, 10),
  },
});

const User = model("User", userSchema);

export default User;
