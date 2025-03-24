import { Schema, model } from "mongoose";
import types from "../constants/types.js";

const userSchema = new Schema({
  username: types.INDEXED(types.UNIQUE_STR_REQ),
  password: types.STR_REQ,
  createdAt: { type: types.NUMBER, default: Date.now },
});

const User = model("User", userSchema);

export default User;
