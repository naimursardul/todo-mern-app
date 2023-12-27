/*
 * Title: MongoDB database
 * Description: MongoDB database
 * Author: Naimur Rahman
 * Date: 2023-12-22
 *
 */

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const MONGODB_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@mern-todo.umea7bk.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Database connected successfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.log(`Error while connecting! ${error.message}`);
  });
};

export default Connection;
