const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Posts = require("./Posts.js");
const User = require("./User.js");

// Definición del modelo de comentarios
const CommentSchema = new Schema({
    commentId: { type: Number, unique: true },
    postId: { type: Schema.Types.ObjectId, ref: Posts },
    author: { type: Schema.Types.ObjectId, ref: User },
    content: { type: String },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
