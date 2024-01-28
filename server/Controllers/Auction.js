const Auction = require("../models/Auction")
const {sendAuctionConfirmationEmail} = require('../middlewares/sendMail');

const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


exports.createAuction = async (req,res) => {
    console.log("Inside create auction");

    try{
        const {cropName, userId , expireTime, bidPrice } = req.body;
        console.log(cropName, userId , expireTime, bidPrice);

        // console.log(req.file);
        // console.log(req.body);

        // const file = req.files.cropImage;
        // console.log(req.files.cropImage);

        
        
        // await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     }
        //     url = result.url;
        //     public_id = result.public_id;

        //     console.log("url : ", url);
        //     console.log("public_id : ", public_id);
        // });
        const public_id = "public_id";
        const url = "url";
        
        const auction = await Auction.create({userId, cropName, expireTime, bidPrice, cropImage:{public_id: public_id, url: url} });

        res.status(200).json({
            success:true,
            auction
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.checkAuction = async (req,res) => {

    console.log("Inside check auction");
}

exports.getAllAuction = async (req,res) => {
    try{
        const auctions = await Auction.find({})

        res.status(200).json({
            success: true,
            auctions
        })

    }catch(err)
    {
        res.status(500).json({
            success: false,
            error:err.message
        })
    }

}

exports.checkMail = async (req,res) =>{

    const { email ,subject ,  winnerName , cropName , finalBidAmount , auctionDate , ownerAccountDetails } = req.body;
    console.log("inside mail funciton");
    console.log( email , subject ,  winnerName , cropName , finalBidAmount , auctionDate , ownerAccountDetails);
    try{
        // const auctionConfirmationEmailOptions = {
        //     email: "krishp759@gmail.com",
        //     subject: "Auction Winner Confirmation",
        //     winnerName: "John Doe",
        //     cropName: "Your Crop Name",
        //     finalBidAmount: "$500",
        //     auctionDate: "2022-02-15",
        //     ownerAccountDetails: "Owner's Bank Account Details",
        //   };

        const auctionConfirmationEmailOptions = {
            email : email ,
            subject : subject ,
            winnerName : winnerName ,
            cropName : cropName ,
            finalBidAmount : finalBidAmount ,
            auctionDate : auctionDate ,
            ownerAccountDetails : ownerAccountDetails
        }
          
          await sendAuctionConfirmationEmail(auctionConfirmationEmailOptions);
    }
    catch(err){
        console.log(err)
    }
}