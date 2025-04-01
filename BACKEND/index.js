import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/lib/db.js";
import cors from "cors";
import path from "path";
import { app, server } from "./src/lib/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.get("/", (req, res) => {
  res.send("hey");
  console.log("server is on");
  connectDB();
});

server.listen(PORT);
