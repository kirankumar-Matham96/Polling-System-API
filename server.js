/* TODO:
  1. Validate the routes in postman
  2. Add form validations
  3. Add document
  4. Add Readme
  5. Deploy and validate
  6. Record and submit
*/

import "dotenv/config";
import express from "express";
import cors from "cors";
import questionsRouter from "./src/features/questions/question.routes.js";
import optionsRouter from "./src/features/options/option.routes.js";
import { connectToDB } from "./src/config/db.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/polling-system/questions", questionsRouter);
app.use("/api/polling-system/options", optionsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Polling-API");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
  connectToDB();
});
