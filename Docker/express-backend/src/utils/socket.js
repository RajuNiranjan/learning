import express from "express";
import http from "http";
import { Server } from "socket.io";
import { FRONT_END_ORIGIN } from "./env.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONT_END_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`client connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`client disconnected ${socket.id}`);
  });
});

export { app, server, io };
