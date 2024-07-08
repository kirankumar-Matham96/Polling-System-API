import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use();

app.get("/", (req, res) => {
  res.send("Welcome to Polling-API");
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
