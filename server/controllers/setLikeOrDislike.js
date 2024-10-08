const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const User = require("../models/User.js");
const Posts = require("../models/Posts.js");
const Notifications = require("../models/Notifications.js");


const setLikeOrDislike = async (req, res) => {
    const { username } = req.usuario;
    const { post_id, option } = req.body;

    if (option === "like") {
        try {
            const user = await User.findOne({ username: username }).lean();
            const post = await Posts.findOne({ postId: post_id }).lean();
    
            const likedPost = await Likes.findOne({ postId: post._id, author: user._id });
    
            if (likedPost) {
                await Likes.findOneAndDelete({ postId: post._id, author: user._id });
    
                const likes = await Likes.find({ postId: post._id }).lean();
                const dislikes = await Dislikes.find({ postId: post._id }).lean();
                
                return res.status(200).json({ success: true, message: "Like eliminado correctamente", likes: likes.length, dislikes: dislikes.length });
            } else {
                await Dislikes.findOneAndDelete({ postId: post._id, author: user._id });
                const result = await Likes.create({ postId: post._id, author: user._id });
                const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean()
                const notificationAlreadyExists = await Notifications.findOne({ from: user._id, reason: "like", to: post.author, postId: post._id });

                if (!notificationAlreadyExists && user._id.equals(post.author) === false) {
                    await Notifications.create({ from: user._id, reason: "like", to: post.author, postId: post._id, postIdNumber: post.postId, notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1, reason: "like", description: `${user.username} le dio un like a tu publicacion` });
                } 
    
                if (result) {
                    const likes = await Likes.find({ postId: post._id }).lean();
                    const dislikes = await Dislikes.find({ postId: post._id }).lean();
    
                    res.status(200).json({ success: true, message: "Like creado correctamente", likes: likes.length, dislikes: dislikes.length });
                }
            }
        } catch (error) {
            res.status(500).json({ error: "An error has occurred while liking the post" });
        }
    }
    if (option === "dislike") {
        try {
            const user = await User.findOne({ username: username }).lean();
            const post = await Posts.findOne({ postId: post_id }).lean();
    
            const dislikedPost = await Dislikes.findOne({ postId: post._id, author: user._id });
    
            if (dislikedPost) {
                await Dislikes.findOneAndDelete({ postId: post._id, author: user._id });
    
                const likes = await Likes.find({ postId: post._id }).lean();
                const dislikes = await Dislikes.find({ postId: post._id }).lean();
                
                return res.status(200).json({ success: true, message: "Dislike eliminado correctamente", likes: likes.length, dislikes: dislikes.length });
            } else {
                await Likes.findOneAndDelete({ postId: post._id, author: user._id });
                const result = await Dislikes.create({ postId: post._id, author: user._id });

                const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean()
                const notificationAlreadyExists = await Notifications.findOne({ from: user._id, reason: "dislike", to: post.author, postId: post._id });

                if (!notificationAlreadyExists && user._id.equals(post.author) === false) {
                    await Notifications.create({ from: user._id, reason: "dislike", to: post.author, postId: post._id, postIdNumber: post.postId, notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1, reason: "dislike", description: `${user.username} le dio un dislike a tu publicacion` });
                } 
    
                if (result) {
                    const likes = await Likes.find({ postId: post._id }).lean();
                    const dislikes = await Dislikes.find({ postId: post._id }).lean();
    
                    res.status(200).json({ success: true, message: "Dislike creado correctamente", likes: likes.length, dislikes: dislikes.length });
                }
            }
        } catch (error) {
            res.status(500).json({ error: "An error has occurred while disliking the post" });
        }
    }
}

module.exports = setLikeOrDislike