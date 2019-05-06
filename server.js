const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// const wifiControl = require('wifi-control');

let app = express();
const port = process.env.PORT || 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('<------ User Connected via Socket.Io ------->');
  // socket.on('chat message', function(msg){
  //   console.log('message: ' + msg);
  // });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
})

app.use(express.static(path.join(__dirname, 'production')))
app.use(bodyParser.json());
app.use(cors());

// wifiControl. init({
//   debug: true
// })
// app.get('/:id', (req, res) => {
//   wifiControl.scanForWiFi((err, response)=>{
//     if (err) console.log(err);
//     res.send(response.networks);
//   })
// })

http.listen(port, () => {
  console.log(`Listening on port ${port}... ------>`);
})