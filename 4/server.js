var express = require('express');
var app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http)

// app.use(express.static(__dirname + '/assets/'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('Server started on the address: http://localhost:3000')
})

io.on('connection', (socket) => {
  socket.emit('connections', Object.keys(io.sockets.connected).length)

  socket.on('disconnect', () => {
    console.log("A user disconnected")
  })
  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', (data))
  })
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', (data))
  })
  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping')
  })
  socket.on('joined', (data) => {
    socket.broadcast.emit('joined', (data))
  })
  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', (data))
  })
})