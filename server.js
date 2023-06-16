const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

// MiddleWeare to use cors
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  // it is okey to accept socket comm from this url
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.listen(3001, () => {
  console.log("Server Started...");
});
