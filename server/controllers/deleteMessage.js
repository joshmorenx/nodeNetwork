const fs = require("fs");
const path = require("path");
const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const ONE_HOUR_MS = 60 * 60 * 1000;

const deleteMessage = (io) => async (req, res) => {
    try {
        const { username } = req.usuario;
        const { messageId } = req.params;
        const { scope } = req.body; // 'me' | 'everyone'

        const user = await User.findOne({ username }).lean();
        const message = await Message.findById(messageId).lean();

        if (!message) {
            return res.status(404).json({ success: false, message: "Mensaje no encontrado" });
        }

        // Solo el autor puede eliminar sus propios mensajes
        if (!message.from.equals(user._id)) {
            return res.status(403).json({ success: false, message: "Solo puedes eliminar tus propios mensajes" });
        }

        if (scope === 'everyone') {
            // Eliminar para todos solo está permitido dentro de la primera hora
            const elapsed = Date.now() - new Date(message.date_created).getTime();

            if (elapsed > ONE_HOUR_MS) {
                return res.status(403).json({ success: false, message: "Solo puedes eliminar para todos dentro de la primera hora" });
            }

            // Eliminar el archivo de video del chat si el mensaje tenía uno
            if (message.video) {
                const filename = message.video.split('/').pop();
                const filePath = path.join(__dirname, `../public/uploads/users/${username}/chat/${filename}`);
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {
                    console.error('Error al eliminar el video del chat:', err);
                }
            }

            await Message.findByIdAndDelete(messageId);

            // Actualizar el último mensaje visible de la conversación si se eliminó el último
            const conversation = await Conversation.findById(message.conversationId);

            if (conversation) {
                const latest = await Message.findOne({ conversationId: conversation._id }, {}, { sort: { date_created: -1 } }).lean();
                conversation.lastMessage = latest ? latest.content : '';
                conversation.lastMessageDate = latest ? latest.date_created : Date.now();
                await conversation.save();
            }

            // En tiempo real: desaparece para ambos participantes
            io.to(`user:${user._id.toString()}`).emit('messageDeleted', { messageId: message._id, conversationId: message.conversationId });
            io.to(`user:${message.to.toString()}`).emit('messageDeleted', { messageId: message._id, conversationId: message.conversationId });
        } else {
            // Eliminar solo para el autor: se oculta de su vista
            await Message.findByIdAndUpdate(messageId, { $addToSet: { hiddenFor: user._id } });

            // Solo se notifica a las demás pestañas del autor
            io.to(`user:${user._id.toString()}`).emit('messageDeleted', { messageId: message._id, conversationId: message.conversationId });
        }

        return res.status(200).json({ success: true, message: "Mensaje eliminado" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = deleteMessage;
