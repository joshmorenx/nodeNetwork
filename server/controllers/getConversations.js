const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const getConversations = async (req, res) => {
    try {
        const { username } = req.usuario;
        const user = await User.findOne({ username }).lean();

        if (!user) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        // Se ocultan las conversaciones que el usuario eliminó (soft delete)
        const conversations = await Conversation.find(
            { participants: user._id, deletedBy: { $ne: user._id } },
            {},
            { sort: { date_updated: -1 } }
        ).lean();

        const result = await Promise.all(conversations.map(async (conversation) => {
            const otherUserId = conversation.participants.find((participant) => !participant.equals(user._id));
            const otherUser = await User.findOne({ _id: otherUserId }, { password: 0 }).lean();

            // Último mensaje visible para este usuario (los ocultados no cuentan)
            const latestVisible = await Message.findOne(
                { conversationId: conversation._id, hiddenFor: { $ne: user._id } },
                {},
                { sort: { date_created: -1 } }
            ).lean();

            const unread = await Message.countDocuments({
                conversationId: conversation._id,
                to: user._id,
                read: false,
                hiddenFor: { $ne: user._id }
            });

            return {
                ...conversation,
                otherUser: {
                    _id: otherUser._id,
                    username: otherUser.username,
                    firstName: otherUser.firstName,
                    lastName: otherUser.lastName,
                    profilePicture: otherUser.profilePicture
                },
                lastMessage: latestVisible ? latestVisible.content : '',
                lastMessageDate: latestVisible ? latestVisible.date_created : conversation.lastMessageDate,
                unread
            };
        }));

        return res.status(200).json({ conversations: result, success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = getConversations;
