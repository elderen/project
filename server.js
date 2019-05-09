const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const wifiControl = require('wifi-control');
const model = require('./middleware/model');
const wifiName = require('wifi-name');
const wifiPass = require('wifi-password');

// Websocket | HTTP | express
const app = express();
const port = process.env.PORT || 3000;
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Single Websocket Connection
io.on('connection', (socket) => {
  showLog(socket);
  console.log('<------ User Connected via Socket.Io ------->');
  socket.on('chat message', function(userMsg){
    let jsonUserMsg = {user: userMsg.split(': ')[0], message: userMsg.split(': ')[1]}
    model.add(jsonUserMsg)
    .then((oneMsg) => {
      console.log('ADDed log: ', oneMsg);
      let msg = [];
      msg.push(oneMsg.user + ': ' + oneMsg.message);
      // console.log('array: ', msg);
      io.emit('chat message', msg);
    })
  });
})

// Wifi-Control module initate
wifiControl.init({
  debug: true
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(cors());
// io.use(p2p);

// Helper Functions
const showLog = (socket) => {
  model.find()
    .then((data) => {
      let logs = [];
      data.map((one) => {
        let msg = one.user + ': ' + one.message;
        logs.push(msg);
      })
      socket.emit('chat message', logs);
    })
}

// RESTful API  *NOT NEEDED
app.get('/network', (req, res) => {
    /* GETS ALL NETWORK WITHIN RANGE */
  // wifiControl.getIfaceState((err, response)=>{
  //   if (err) console.log(err);
  //   res.send(response.networks);
  // })
  wifiName().then((name) => {
    console.log('NAME: ', name)
    res.send(name);
    // wifiPass().then((pw) => {
    //   console.log('PASSWORD: ', pw)
    //   let login = {"network":name, "password":pw};
    //   res.send(login);
    // })
  })
})

app.post('/message', (req, res) => {
  let incoming = req.body;
  console.log(incoming);
  model.add(incoming)
    .then((data) => {
      console.log('ADD DATA: ', data);
      res.send(data);
    })
})

app.get('/message', (req, res) => {
  model.find()
    .then((data) => {
      console.log('FIND DATA: ', data);
      res.send(data);
    })
})

app.delete('/message', (req, res) => {
  model.deleteAll()
    .then((data) => {
      console.log('DELETE DATA: ', data);
      res.send(data);
    })
})

// Server Port
server.listen(port, () => {
  console.log(`Listening on port ${port}... ------>`);
})