import express from "express";
import dotenv from "dotenv";
import dbConnect from "./DB/dbConnect.js";
import authRouter from "./routs/authUser.js";
import messageRouter from "./routs/messageRoute.js";
import cookieParser from "cookie-parser";
import userrout from "./routs/userrout.js";
import path from "path";
import { app, server } from "./Socket/socket.js";
// Load environment variables
const __dirname = path.resolve();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Test route

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userrout);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Server working");
});

// Database connection
dbConnect();

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
