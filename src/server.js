import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "../lib/prisma.ts";

//Routes
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

config();
connectDB();

const app = express();

//Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const VERSION = "/api/v1";

app.get(`${VERSION}/`, (req, res) => {
  return res.status(200).json({ message: "Hello World!" });
});

//API routes
app.use(`${VERSION}/movies`, movieRoutes);
app.use(`${VERSION}/auth`, authRoutes);
app.use(`${VERSION}/watchlist`, watchlistRoutes);

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
