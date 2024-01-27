const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment",
    }]

    // likes : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "Like",
    // }],
});

module.exports = mongoose.model('Post', postSchema);
