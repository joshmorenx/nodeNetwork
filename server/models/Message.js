const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    read: { type: Boolean, default: false },
    hiddenFor: [{ type: Schema.Types.ObjectId, ref: "User" }], // usuarios que ocultaron el mensaje
    date_created: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
