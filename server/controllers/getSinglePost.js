const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const Comments = require("../models/Comments.js");

const getSinglePost = async (req, res) => {
    const { username } = req.usuario
    const { id } = req.headers

    try {
        const postData = await Posts.findOne({ postId: id }).lean()

        if (!postData) {
            return res.status(404).json({ error: 1, message: "Post no encontrado" })
        }

        const user = await User.findOne({ _id: postData.author }).lean()
        const comments = await Comments.find({ postId: postData._id }).lean()
        const likes = await Likes.find({ postId: postData._id }).lean()
        const dislikes = await Dislikes.find({ postId: postData._id }).lean()

        const post = {
            ...postData,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            createdAt: user.createdAt,
            comments: await Promise.all(comments.map(async (comment) => {
                const user = await User.findOne({ _id: comment.author }).lean()
                return {
                    ...comment,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })),
            likesAuthors: likes.map(like => like.author),
            dislikesAuthors: dislikes.map(dislike => dislike.author)
        }

        if (post) {
            return res.status(200).json({ post: post, success: true, message: "Post encontrado" })
        }
        

    } catch (error) {
        console.error(error)
    }
}

module.exports = getSinglePost
