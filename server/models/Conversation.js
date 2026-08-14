const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // exactamente 2 usuarios
    lastMessage: { type: String, default: "" },
    lastMessageDate: { type: Date, default: Date.now },
    deletedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // usuarios que ocultaron la conversación
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
