import User from "../models/User.js";

export const isUsernameAvailable = async (username) => {
  const user = await User.findOne({ username });
  return user === null;
};
