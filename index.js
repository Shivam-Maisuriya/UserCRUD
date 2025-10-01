import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js"

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Connected to MongoDB!"))
  .catch((error) => {
    console.log("Error in MongoDb connection:", error);
  });

app.use('/api/user', userRoute)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
