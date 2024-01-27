const Auction = require("../models/Auction")


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