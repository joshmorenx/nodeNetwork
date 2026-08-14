const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");
const Notifications = require("../models/Notifications.js");

const markMessagesRead = async (req, res) => {
    try {
        const { username } = req.usuario;
        const { username_from } = req.body;

        const user = await User.findOne({ username }).lean();
        const otherUser = await User.findOne({ username: username_from }).lean();

        if (!otherUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        const conversation = await Conversation.findOne({ participants: { $all: [user._id, otherUser._id] } });

        if (conversation) {
            await Message.updateMany({ conversationId: conversation._id, to: user._id, read: false }, { $set: { read: true } });
        }

        // Marcar también como leídas las notificaciones de mensaje pendientes de ese usuario
        await Notifications.updateMany({ from: otherUser._id, to: user._id, reason: "message", read: false }, { $set: { read: true } });

        return res.status(200).json({ success: true, message: "Mensajes marcados como leídos" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = markMessagesRead;
