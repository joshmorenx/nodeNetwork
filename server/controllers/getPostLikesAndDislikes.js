const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");

const getPostLikesAndDislikes = async (req, res) => {
    const { post } = req.headers

    const likes = await Likes.find({ postId: post.postId })

    if (likes.length === 0) {
        console.log('just worked')
    }
}

module.exports = getPostLikesAndDislikes