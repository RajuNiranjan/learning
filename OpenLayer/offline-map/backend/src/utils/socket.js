import express from "express";
import http from "http";
import { Server } from "socket.io";
import { FRONTEND_URL } from "./env.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`client connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

export { io, app, server };
