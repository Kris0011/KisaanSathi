const Post = require("../models/Post")


exports.createPost = async (req,res) => {
    try{
        const { title , desc } = req.body

        const post = await Post.create({ title , desc })

        res.status(200).json({
            success:true,
            post
        })

    } catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getPost = async (req,res) => {
    try{
        const post = await Post.find({})

        res.status(200).json({
            success: true,
            post
        })

    }
    
    catch(err)
    {
        res.status(500).json({
            success: false,
            error:err.message
        })
    }
}