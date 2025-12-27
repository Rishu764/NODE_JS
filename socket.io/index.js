import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io

io.on("connection", (client) => {
  client.on('user-message', (msg) => {
    io.emit('message', msg);
  });
});


app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
})

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

