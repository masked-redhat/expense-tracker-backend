import mongoose from "mongoose";
import { client } from "./connect.js";
import _env from "../constants/env.js";

const closeDb = async () => {
  try {
    await mongoose.connection.close();

    console.log(`Closed ${_env.db.CLIENT}`);
  } catch (err) {
    console.log(err);
    console.log(`Failed to close ${_env.db.CLIENT}`);
  }
};

const closeCache = async () => {
  try {
    await client.disconnect();

    console.log(`Closed ${_env.cache.CLIENT}`);
  } catch (err) {
    console.log(err);
    console.log(`Failed to close ${_env.cache.CLIENT}`);
  }
};

const _close = {
  db: closeDb,
  cache: closeCache,
};

export default _close;
