const mongoose = require("mongoose");
const postModel = require("../models/postModel")

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postModel",
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Comment" , commentSchema);
