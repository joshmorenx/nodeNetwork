const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Posts = require("./Posts.js");
const User = require("./User.js");

const LikeSchema = new Schema({
    postId: { type: Schema.Types.ObjectId, ref: Posts },
    author: { type: Schema.Types.ObjectId, ref: User },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
})

const Likes = mongoose.model("Likes", LikeSchema);

module.exports = Likes