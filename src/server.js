import express from "express";
import cors from "cors";
import questionsRouter from "./features/questions/question.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/polling-system",questionsRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Polling-API");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
