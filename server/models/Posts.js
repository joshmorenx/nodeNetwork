const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");
const CommentSchema = require("./Comments.js");

// Definición del modelo de publicaciones
const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: UserSchema },
    content: { type: String },
    image: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: CommentSchema }],
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;