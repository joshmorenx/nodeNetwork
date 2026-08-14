const User = require("../models/User.js");
const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

const deleteConversation = async (req, res) => {
    try {
        const { username } = req.usuario;
        const { conversationId } = req.params;

        const user = await User.findOne({ username }).lean();
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).json({ success: false, message: "Conversación no encontrada" });
        }

        // Solo los participantes pueden eliminar la conversación
        const isParticipant = conversation.participants.some((participant) => participant.equals(user._id));

        if (!isParticipant) {
            return res.status(403).json({ success: false, message: "No tienes permisos para eliminar esta conversación" });
        }

        // Eliminación suave: solo se oculta para el usuario actual
        if (!conversation.deletedBy) {
            conversation.deletedBy = [];
        }

        if (!conversation.deletedBy.some((id) => id.equals(user._id))) {
            conversation.deletedBy.push(user._id);
        }

        // El historial queda oculto solo para el usuario actual: aunque un nuevo
        // mensaje haga visible la conversación de nuevo, no recuperará la historia antigua
        await Message.updateMany(
            { conversationId: conversation._id, hiddenFor: { $ne: user._id } },
            { $addToSet: { hiddenFor: user._id } }
        );

        // Si ambos participantes la ocultaron, se limpia por completo de la base de datos
        const bothDeleted = conversation.participants.every((participant) =>
            conversation.deletedBy.some((id) => id.equals(participant))
        );

        if (bothDeleted) {
            await Message.deleteMany({ conversationId: conversation._id });
            await Conversation.findByIdAndDelete(conversationId);
        } else {
            await conversation.save();
        }

        return res.status(200).json({ success: true, message: "Conversación eliminada" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = deleteConversation;
