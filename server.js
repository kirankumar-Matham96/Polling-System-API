// Import environment variables from a .env file into process.env
import "dotenv/config";

// Import required modules
import express from "express";
import cors from "cors";
import questionsRouter from "./src/features/questions/question.routes.js";
import optionsRouter from "./src/features/options/option.routes.js";
import { connectToDB } from "./src/config/db.config.js";
import { errorHandlingMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import { unknownPathHandlerMiddleware } from "./src/middlewares/unknownPathHandler.middleware.js";

// Initialize the express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Route for handling questions-related requests
app.use("/api/polling-system/questions", questionsRouter);

// Route for handling options-related requests
app.use("/api/polling-system/options", optionsRouter);

// Basic route to confirm the API is working
app.get("/", (req, res) => {
  res.send("Welcome to Polling-API");
});

// Middleware for handling unknown paths (404 errors)
app.use(unknownPathHandlerMiddleware);

// Middleware for handling errors
app.use(errorHandlingMiddleware);

// Start the server and connect to the database
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
  connectToDB();
});
