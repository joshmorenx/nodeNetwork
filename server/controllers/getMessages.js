const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const getMessages = async (req, res) => {
    try {
        const { username } = req.usuario;
        const { username: otherUsername } = req.params;

        const user = await User.findOne({ username }).lean();
        const otherUser = await User.findOne({ username: otherUsername }, { password: 0 }).lean();

        if (!otherUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado" });
        }

        const conversation = await Conversation.findOne({ participants: { $all: [user._id, otherUser._id] } }).lean();

        const otherUserData = {
            _id: otherUser._id,
            username: otherUser.username,
            firstName: otherUser.firstName,
            lastName: otherUser.lastName,
            profilePicture: otherUser.profilePicture
        };

        // Si el usuario eliminó la conversación (soft delete), no ver su historial
        if (conversation && conversation.deletedBy && conversation.deletedBy.some((id) => id.equals(user._id))) {
            return res.status(200).json({ success: true, conversationId: null, otherUser: otherUserData, messages: [] });
        }

        const messages = conversation
            ? await Message.find({ conversationId: conversation._id, hiddenFor: { $ne: user._id } }, {}, { sort: { date_created: 1 } })
                .populate("from", "username firstName lastName profilePicture")
                .lean()
            : [];

        return res.status(200).json({
            success: true,
            conversationId: conversation ? conversation._id : null,
            otherUser: otherUserData,
            messages
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = getMessages;
