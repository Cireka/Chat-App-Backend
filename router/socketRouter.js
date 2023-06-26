const express = require("express");
const { Router } = require("express");
const { Server } = require("socket.io");
const socketController = require("../controller/socketController");

// Create a router instance
const router = Router();

// Create a Socket.IO server instance
const io = new Server();

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

router.route("/").get(socketController.SocketHandller);

// Attach Socket.IO to the router
router.io = io;

module.exports = router;
