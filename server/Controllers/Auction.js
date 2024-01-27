const Auction = require("../models/Auction")
const {sendAuctionConfirmationEmail} = require('../middlewares/sendMail');

const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


exports.createAuction = async (req,res) => {
    try{
        const {cropName,userId } = req.body
        const{ tempFilePath } = req.files.cropImage;
        
        
        await cloudinary.uploader.upload(tempFilePath, (err, result) => {
            if (err) {
                console.log(err);
            }
            url = result.url;
            public_id = result.public_id;
        });
        
        const auction = await Auction.create({userId,cropName, url, public_id});

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