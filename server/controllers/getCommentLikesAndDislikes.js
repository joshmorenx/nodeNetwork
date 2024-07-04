const Comments = require("../models/Comments.js");
const Posts = require("../models/Posts.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");

const getCommentLikesAndDislikes = async (req, res) => {
    const { comment } = req.headers
    const commentId = comment
    try {
        const commentLikes = await CommentLikes.find({ commentId: commentId }).lean()
        const commentDislikes = await CommentDislikes.find({ commentId: commentId }).lean()
        res.json({ commentLikes: commentLikes.length, commentDislikes: commentDislikes.length })
    } catch (error) {
        res.json({ error: error })
    }
}

module.exports = getCommentLikesAndDislikes