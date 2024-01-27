const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const { response } = require("express");


exports.createComment = async (req, res) => {
    try {

        console.log("creating comment");

        const { post, user, body } = req.body;

        const comment = new Comment({
            post, user, body
        })

        const savedComment = await comment.save();

        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } },
            { new: true })
            .populate("comments")
            .exec();

        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        return res.status(500).json({
            error : "Error while creating comment",            
        })
    }
}