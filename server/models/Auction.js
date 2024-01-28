const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  desc: {
    type: String,
    required: true
  },
  cropName: {
    type: String,
    required: true,
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  expireTime: {
    type: Date,
    default: function () {
      return new Date(Date.now() +  400 * 60 * 1000); // Setting the default expiration time to 15 minutes from now
    }
  },
  bidPrice:{
    type: Number,
    default: 0
  },
  bidder:{
    type: String,
    default: ""
  },
  cropImage: {
    publicId : String,
    url : String,
  }
});

module.exports = mongoose.model('Auction', auctionSchema);
