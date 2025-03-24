import express, { Application } from "express";
// import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes";

dotenv.config();

// Initialize Express
const app: Application = express();
app.use(express.json());
app.use(cors())


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

//API routes
app.use("/api/auth", authRoutes);

//Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", user)

//Test Route
app.get("/", (req, res) => {
  res.send("Hey your backend is running")
})

//Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});



// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());


// Global error handling
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).send("Seems like we messed up somewhere...");
// });











// // Routes
// app.get("/", (req, res) => {
//   res.render("index");
// });

// API Routes
// app.use("/api/health", healthRouter);

// await mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((e) => console.error(e));


// const app = express();

// View Engine
// app.set("views", "./views");
// app.set("view engine", "pug");
