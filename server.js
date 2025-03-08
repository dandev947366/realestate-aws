import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js"
const app = express();
//db
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes middleware
app.use('/api', authRoutes) //prefix

const server = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

export { app, server }; 