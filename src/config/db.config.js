// imports
import mongoose from "mongoose";

/**
 * DB config using mongoose
 */
export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to db...");
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while connecting to db");
  }
};
