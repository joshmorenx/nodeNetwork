const User = require("../models/User.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");

const getCommentLikesAndDislikes = async (req, res) => {
    const { username } = req.usuario
    const { comment } = req.headers
    const commentId = comment
    try {
        const user = await User.findOne({ username: username }).lean()
        const commentLikes = await CommentLikes.find({ commentId: commentId }).lean()
        const commentDislikes = await CommentDislikes.find({ commentId: commentId }).lean()
        const liked = commentLikes.some((like) => like.author.equals(user._id))
        const disliked = commentDislikes.some((dislike) => dislike.author.equals(user._id))
        res.json({ commentLikes: commentLikes.length, commentDislikes: commentDislikes.length, liked, disliked })
    } catch (error) {
        res.json({ error: error })
    }
}

module.exports = getCommentLikesAndDislikes