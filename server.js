import { Server } from "socket.io"

const io = new Server(3001, {
  cors: {
    origin: "*"
  }
})

console.log("WebSocket server started on port 3001")

let clients = 0

io.on("connection", (socket) => {

  clients++

  io.emit("clients", clients)

  socket.on("disconnect", () => {

    clients--

    io.emit("clients", clients)

  })

})