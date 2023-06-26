const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const socketRouter = require("./router/socketRouter");
const messageFormat = require("./utils/messageFormat");
const { userJoin, getCurrentUser } = require("./utils/users");

const app = express();
app.use(cors());

const Socketserver = http.createServer(app);
const io = socketio(Socketserver, {
  cors: {
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

io.on("connection", (socket) => {
  console.log(`New Websocket Connection ${socket.id}`);

  let user;

  socket.on("joinRoom", ({ userName, room }) => {
    user = userJoin(socket.id, userName, room);
    console.log(`${user.userName} joined room ${user.room}`);
    socket.join(user.room);

    // Using This Broadcast Method event will be emitted for everyone except the current user
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageFormat("ChatApp", `${user.userName} Has Connected!`)
      );

    socket.on("leaveRoom", () => {
      console.log(`${user.userName} left room ${user.room}`);
      socket.leave(user.room);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
      // use io.emit to emit message to everybody
      io.to(user.room).emit(
        "message",
        messageFormat("ChatApp", `${user.userName} Has Left.`)
      );
    });
  });

  socket.on("chatMessage", (msg) => {
    io.to(user.room).emit(
      "message",
      messageFormat(
        msg.userName,
        `${msg.message} Meant For Room ${user.room}`,
        user.room // Change 'room' to 'user.room'
      )
    );
  });
});

// app.use("/socket", socketRouter);

module.exports = Socketserver;
