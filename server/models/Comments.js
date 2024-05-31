const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");

// Definición del modelo de comentarios
const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: UserSchema },
    content: { type: String },
    image: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    date_created: { type: Date, default: Date.now() },
    date_updated: { type: Date, default: Date.now() },  
});

const Comments = mongoose.model("Comments", CommentSchema);

module.exports = Comments;
