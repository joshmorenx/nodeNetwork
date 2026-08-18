const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");
const Notifications = require("../models/Notifications.js");

const sendMessage = (io) => async (req, res) => {
    try {
        const { username } = req.usuario;
        const { username_to, content } = req.body;
        const videoFile = req.file; // multer upload.single('video')

        if ((!content || !content.trim()) && !videoFile) {
            return res.status(400).json({ success: false, message: "El mensaje no puede estar vacío" });
        }

        // Guardar el video (si viene) en una carpeta de chat del usuario
        let videoPath = null;
        if (videoFile) {
            const chatFolderPath = path.join(__dirname, `../public/uploads/users/${username}/chat/`);

            if (!fs.existsSync(chatFolderPath)) {
                fs.mkdirSync(chatFolderPath, { recursive: true });
            }

            const extension = path.extname(videoFile.originalname) || '.mp4';
            const uniqueFileName = `${uuidv4()}${extension}`;
            const chatVideoPath = path.join(chatFolderPath, uniqueFileName);

            fs.copyFileSync(videoFile.path, chatVideoPath);
            fs.unlinkSync(videoFile.path);

            videoPath = `/api/public/uploads/users/${username}/chat/${uniqueFileName}`;
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
            content: content ? content.trim() : '',
            video: videoPath
        });
        await message.save();

        // Un nuevo mensaje hace visible la conversación de nuevo para ambos
        const previewText = content && content.trim() ? content.trim() : '📹 Video';
        conversation.deletedBy = [];
        conversation.lastMessage = previewText;
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
            content: content ? content.trim() : '',
            video: videoPath,
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
