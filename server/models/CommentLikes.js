const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comments = require("./Comments.js");
const User = require("./User.js");

const CommentLikeSchema = new Schema({
    commentId: { type: Schema.Types.ObjectId, ref: Comments },
    author: { type: Schema.Types.ObjectId, ref: User },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
})

const CommentLikes = mongoose.model("CommentLikes", CommentLikeSchema);

module.exports = CommentLikes