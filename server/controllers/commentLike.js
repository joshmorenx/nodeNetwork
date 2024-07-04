const Comments = require("../models/Comments.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");
const User = require("../models/User.js");

const commentLike = async (req, res) => {
    const { username } = req.usuario
    const { comment } = req.body

    try {
        const user = await User.findOne({ username: username }).lean()
        const like = await CommentLikes.findOne({ commentId: comment, author: user._id })
        if(like) {
            await CommentLikes.findOneAndDelete({ commentId: comment, author: user._id })

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            return res.status(200).json({ success: true, likes: likes.length, dislikes: dislikes.length })
        } else {
            await CommentDislikes.findOneAndDelete({ commentId: comment, author: user._id })
            await CommentLikes.create({ commentId: comment, author: user._id })

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            return res.status(200).json({ success: true, likes: likes.length, dislikes: dislikes.length })
        }
    } catch (error) {
        res.json({ error: error })    
    }

}

module.exports = commentLike