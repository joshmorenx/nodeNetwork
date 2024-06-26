const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const User = require("../models/User.js");
const Posts = require("../models/Posts.js");


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
    
                if (result) {
                    const likes = await Likes.find({ postId: post._id }).lean();
                    const dislikes = await Dislikes.find({ postId: post._id }).lean();
    
                    res.status(200).json({ success: true, message: "Like creado correctamente", likes: likes.length, dislikes: dislikes.length });
                }
            }
        } catch (error) {
            console.log(error);
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
    
                if (result) {
                    const likes = await Likes.find({ postId: post._id }).lean();
                    const dislikes = await Dislikes.find({ postId: post._id }).lean();
    
                    res.status(200).json({ success: true, message: "Dislike creado correctamente", likes: likes.length, dislikes: dislikes.length });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = setLikeOrDislike