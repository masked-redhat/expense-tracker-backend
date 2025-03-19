import mongoose from "mongoose";

const closeMongo = async () => {
  await mongoose.connection.close();

  console.log("Close Mongo DB Connection");
};

export default closeMongo;
