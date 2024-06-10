const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");

// Definición del modelo de amistad
const FriendshipSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: UserSchema },
    friend: { type: Schema.Types.ObjectId, ref: UserSchema },
    date_created: { type: Date, default: Date.now() },
});

const Friendship = mongoose.model("Friendship", FriendshipSchema);

module.exports = Friendship;