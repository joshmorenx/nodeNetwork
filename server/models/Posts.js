const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");
const CommentSchema = require("./Comments.js");

// Definición del modelo de publicaciones
const PostSchema = new Schema({
    postId: { type: Number, unique: true },
    author: { type: Schema.Types.ObjectId, ref: UserSchema },
    content: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    images: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: UserSchema }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: UserSchema }],
    comments: [{ type: Schema.Types.ObjectId, ref: CommentSchema }],
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
});

const Posts = mongoose.model("Post", PostSchema);

module.exports = Posts;