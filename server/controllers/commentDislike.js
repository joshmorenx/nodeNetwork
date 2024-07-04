const Comments = require("../models/Comments.js")
const CommentLikes = require("../models/CommentLikes.js")
const CommentDislikes = require("../models/CommentDislikes.js")
const User = require("../models/User.js")

const commentDislike = async (req, res) => {
    const { username } = req.usuario
    const { comment } = req.body

    try {
        const user = await User.findOne({ username: username }).lean()
        const dislike = await CommentDislikes.findOne({ commentId: comment, author: user._id })
        if (dislike) {
            await CommentDislikes.findOneAndDelete({ commentId: comment, author: user._id })

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            res.json({ success: true, likes: likes.length, dislikes: dislikes.length })
        } else {
            await CommentLikes.findOneAndDelete({ commentId: comment, author: user._id })
            await CommentDislikes.create({ commentId: comment, author: user._id })

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            res.json({ success: true, likes: likes.length, dislikes: dislikes.length })
        }
    } catch (error) {
        res.json({ error: error })
    }

}

module.exports = commentDislike