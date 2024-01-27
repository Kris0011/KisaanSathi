const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config({ path: "config/config.env" })
const user = require('./routes/User')
const auction = require('./routes/Auction');
const Auction = require('./models/Auction');

const post = require('./routes/Post');

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

const server = http.createServer(app); 

 io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    socket.on('message-sent', (data) => {
        io.sockets.emit('message-received', { message: data.message });
    });

    socket.on('placeBid',async (data) => {
        
        const currentAuction = await Auction.findById(data.auction._id)
        
            if(currentAuction) {
            currentAuction.bidPrice += 1;
            }
            currentAuction.bidder = data.bidder;

        await currentAuction.save();

        
        io.to(data.auction._id).emit('updateAuction',{updatedAuction: currentAuction,bidder:data.bidder})
        }
    )
    socket.on('redirect',(data) => {
        socket.join(data.auction._id)
    })
    socket.on('joinAuction', (data) => {
        socket.join(data.auctionId)
      });
});
//router
app.use('/api/v1',user)
app.use('/api/v1',auction)
app.use('/api/v1',post)



module.exports = server;
