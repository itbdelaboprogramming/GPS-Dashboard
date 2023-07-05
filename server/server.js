// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv");


const app = express();

app.use(express.json());
// Morgan Package untuk melihat request yang masuk
app.use(morgan('dev'))
    // CORS
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// Open server on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    let ports = server.address().port;
    console.log("App now running on port", ports);
});

var carlist = [];
var uniquelist = [];
// Setup Socket IO and CORS handler
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4200"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});

function uniqueElm(array) {
  return array.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}


// Make an event connection when client connected
io.on("connection", (socket) => {

    // socket.on('room',(data) => {
    //   console.log(data)
    //   room_ = data
    //   if(!(room_ in robotlist)){
    //     robotlist.push(room_)
    //     robotlist.sort()
    //     socket.emit('robot-list',robotlist)
    //   }

    //   socket.room = room_
    //   socket.join(room_)
    // })

    // socket.emit('robot-list',robotlist)
    // Send a message to the client at "hello" event
    socket.emit("hello","world");

    // Listen to location data at "location" event from raspberry pi client
    socket.on("gps", (data) => {
       payload = JSON.parse(data)
       console.log("car id : "+ payload.id)
       carlist.push(payload.id)
       carlist.sort()
      //   console.log(carlist)
      //  if(!(payload.id in carlist)){
      //   carlist.push(payload.id)
      //   carlist.sort()
      //   console.log(carlist)
      //   console.log("new car assigned")
      //  }

      console.log(payload)
      uniquelist = carlist.filter((x,i,a)=>a.indexOf(x)==i)
      console.log(uniquelist)
      // console.log(payload.id in carlist)
      io.emit("vehicle-list",uniquelist)
        // socket.room = payload.room

         // Send received location data in "location-next" event in order to be received by angular app client
      io.emit("gps-then",payload)

      });

        // Listen to heading data at "heading" event from raspberry pi client
        socket.on("heading", (data) => {
          payload = JSON.parse(data)
          console.log(payload)
          socket.room = payload.room

           // Send received heading data in "heading-next" event in order to be received by angular app client
          io.in(payload.room).emit("heading1",payload)

        });


  });

