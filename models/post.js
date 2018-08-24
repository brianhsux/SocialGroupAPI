var mongoose = require("mongoose")

var postSchema = new mongoose.Schema({
    authorEmail: String,
    authorName: String,
    authorImage: String,
    postImage: String,
    postContent: String,
    date: { type: Date, default: Date.now },
    comments: []
});

module.exports = mongoose.model("Post", postSchema);