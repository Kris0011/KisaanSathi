const Auction = require("../models/Auction")
const {sendAuctionConfirmationEmail} = require('../middlewares/sendMail');


exports.createAuction = async (req,res) => {
    try{
        const {cropName,userId} = req.body

        const auction = await Auction.create({userId,cropName})

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