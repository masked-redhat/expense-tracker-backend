import mongoose from "mongoose";
import env from "../../env/env.config.js";

const connectToMongo = async () => {
  await mongoose.connect(env.mongo.uri);

  console.log("Connected to Mongo");
};

export default connectToMongo;
