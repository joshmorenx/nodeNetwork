const Comments = require("../models/Comments.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");
const User = require("../models/User.js");
const Notifications = require("../models/Notifications.js");
const Posts = require("../models/Posts.js");

const commentLike = async (req, res) => {
    const { username } = req.usuario
    const { comment } = req.body

    try {
        const user = await User.findOne({ username: username }).lean()
        const like = await CommentLikes.findOne({ commentId: comment, author: user._id })
        const commentData = await Comments.findOne({ _id: comment }).lean()
        const post = await Posts.findOne({ _id: commentData.postId }).lean()

        if(like) {
            await CommentLikes.findOneAndDelete({ commentId: comment, author: user._id })

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            return res.status(200).json({ success: true, likes: likes.length, dislikes: dislikes.length })
        } else {
            await CommentDislikes.findOneAndDelete({ commentId: comment, author: user._id })
            await CommentLikes.create({ commentId: comment, author: user._id })

            const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean()
            const notificationAlreadyExists = await Notifications.findOne({ from: user._id, reason: "commentlike", to: commentData.author, postId: commentData.postId });

            if (!notificationAlreadyExists && user._id.equals(commentData.author) === false) {
                await Notifications.create({ from: user._id, to: commentData.author, postId: commentData.postId, postIdNumber: post.postId, notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1, reason: "commentlike", description: `${user.username} le dio un like a tu comentario` });
            }

            const likes = await CommentLikes.find({ commentId: comment }).lean()
            const dislikes = await CommentDislikes.find({ commentId: comment }).lean()

            return res.status(200).json({ success: true, likes: likes.length, dislikes: dislikes.length })
        }
    } catch (error) {
        res.json({ error: error })    
    }

}

module.exports = commentLike