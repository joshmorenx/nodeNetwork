const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");

// Definición del modelo de publicaciones
const PostSchema = new Schema({
    postId: { type: Number, unique: true },
    author: { type: Schema.Types.ObjectId, ref: UserSchema },
    content: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    images: [{ type: String }],
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },
});

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;