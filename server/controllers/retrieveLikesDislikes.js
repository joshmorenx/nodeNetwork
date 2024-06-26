const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const Posts = require("../models/Posts.js");
const User = require("../models/User.js")

const retrieveLikesDislikes = async (req, res) => {
    const { post_id } = req.headers;
    const { username } = req.usuario;

    try {
        const user = await User.findOne({ username: username }).lean()
        const post = await Posts.findOne({ postId: post_id }).lean()
        const likedPost = await Likes.findOne({ postId: post._id, author: user._id })
        const dislikedPost = await Dislikes.findOne({ postId: post._id, author: user._id })

        const likes = await Likes.find({ postId: post._id }).lean();
        const dislikes = await Dislikes.find({ postId: post._id }).lean();

        if(likedPost){
            return res.status(200).json({ liked: true, disliked: false, success: true, message: 'this post it has been liked by the user ' + user.username + '', likes: likes.length, dislikes: dislikes.length })
        } 
        else if(dislikedPost){
            return res.status(200).json({ liked: false, disliked: true, success: true, message: 'this post it has been disliked by the user ' + user.username + '', likes: likes.length, dislikes: dislikes.length })
        }
        else {
            return res.status(200).json({ liked: false, disliked: false, success: false, message: 'this post it has not been liked or disliked by the user ' + user.username + '', likes: likes.length, dislikes: dislikes.length })
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = retrieveLikesDislikes