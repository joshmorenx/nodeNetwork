const Comments = require("../models/Comments.js");

const deleteComment = async (req, res) => {
    try {
        let result = undefined
        const { comment_id } = req.headers
        const comment = await Comments.findOne({ commentId: comment_id }).lean()

        if (comment) {
            await Comments.findOneAndDelete({ commentId: comment_id }).lean()
            res.status(200).json({ success: true, message: 'comentario eliminado exitosamente' })
        }
    } catch (error) {
        res.status(500).json({ success: true, message: 'comentario eliminado exitosamente' })
    }
}

module.exports = deleteComment