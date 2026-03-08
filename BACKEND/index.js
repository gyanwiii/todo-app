// index.js

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
  })
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  });

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});