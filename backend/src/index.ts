import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Import Routes
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"

dotenv.config();

// Initialize Express
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(express.static("./public"));
app.use(morgan("dev"));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

//Test Route
app.get("/", (req, res) => {
  res.send("Hey your backend is running")
})

//Glogal Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error", err.message);
  res.status(500).json({ message: "Something went wrong!", error: err.message})
})

//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});





// View Engine
// app.set("views", "./views");
// app.set("view engine", "pug");
