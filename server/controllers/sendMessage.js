const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");
const Notifications = require("../models/Notifications.js");

const sendMessage = (io) => async (req, res) => {
    try {
        const { username } = req.usuario;
        const { username_to, content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ success: false, message: "El mensaje no puede estar vacío" });
        }

        const user = await User.findOne({ username }).lean();
        const otherUser = await User.findOne({ username: username_to }, { password: 0 }).lean();

        if (!otherUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        let conversation = await Conversation.findOne({ participants: { $all: [user._id, otherUser._id] } });

        if (!conversation) {
            conversation = new Conversation({ participants: [user._id, otherUser._id] });
            await conversation.save();
        }

        const message = new Message({
            conversationId: conversation._id,
            from: user._id,
            to: otherUser._id,
            content: content.trim()
        });
        await message.save();

        // Un nuevo mensaje hace visible la conversación de nuevo para ambos
        conversation.deletedBy = [];
        conversation.lastMessage = content.trim();
        conversation.lastMessageDate = message.date_created;
        await conversation.save();

        // Notificación para el destinatario (el change stream de notificaciones la entrega en tiempo real)
        const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean();
        await Notifications.create({
            from: user._id,
            to: otherUser._id,
            notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1,
            reason: "message",
            description: `${user.username} te ha enviado un mensaje`,
            followerUsername: user.username
        });

        const messageDoc = {
            _id: message._id,
            conversationId: conversation._id,
            from: { _id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, profilePicture: user.profilePicture },
            to: otherUser._id,
            content: content.trim(),
            read: false,
            date_created: message.date_created
        };

        // Entrega en tiempo real a ambos participantes (pestañas del emisor y del receptor)
        io.to(`user:${user._id.toString()}`).emit("privateMessage", messageDoc);
        io.to(`user:${otherUser._id.toString()}`).emit("privateMessage", messageDoc);

        return res.status(200).json({ success: true, message: messageDoc });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = sendMessage;
