import mongoose from "mongoose";
import { DB_URI_ATLAS, DB_URI_LOCAL } from "../config/config.js";
export async function connectDb() {
  try {
    await mongoose.connect(DB_URI_ATLAS);
    await mongoose.syncIndexes();
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
    console.log("DB connetion failed");
  }
}
