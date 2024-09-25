const Comments = require("../models/Comments.js")

const updateComment = async (req, res) => {
    const { post_id: commentId, content, latitude, longitude } = req.body;

    try {
        const filter = { content: content, latitude: latitude, longitude: longitude };
        const result = await Comments.findOneAndUpdate({ commentId: commentId }, filter, {new: true})

        if(result){
            return res.status(200).json({message: 'comentario actualizado', success: true, post: result})
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = updateComment