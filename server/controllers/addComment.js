const User = require("../models/User.js");
const Posts = require("../models/Posts.js");
const Comments = require("../models/Comments.js");
const Notifications = require("../models/Notifications.js");

const addComment = async (req, res) => {

    const { username } = req.usuario;
    const { postId, content } = req.body;

    try {
        const user = await User.findOne({ username: username }).lean();
        const post = await Posts.findOne({ postId: postId }).lean();
        const lastComment = await Comments.findOne({}, {}, { sort: { commentId: -1 } }).lean();

        const result = await Comments.create({ commentId: lastComment.commentId + 1, postId: post._id, author: user._id, content: content });

        if (result) {
            
            const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean()

            if (user._id.equals(post.author) === false) {
                await Notifications.create({ from: user._id, reason: "comment", to: post.author, postId: post._id, notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1, reason: "comment", description: `${user.username} comentó tu publicacion` });
            }
            
            const newCurrentComments = await Comments.find({ postId: post._id }).lean();
            res.json({
                success: true, message: "Comentario creado correctamente", newCurrentComments: await Promise.all(newCurrentComments.map(async (comment) => {
                    const user = await User.findOne({ _id: comment.author }).lean();
                    return {
                        ...comment,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                }))
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = addComment;