const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const Comments = require("../models/Comments.js");

const getPosts = async (req, res) => {
    try {
        const { query } = req.headers
        const { username } = req.usuario;
        const userData = await User.findOne({ username: username })
        const followings = await Relationships.find({ from: userData._id }).lean();
        let postsQuery = [] //PQ

        if (!query){
            postsQuery = await Posts.find({ $or: [{ author: { $in: followings.map(following => following.to) } }, { author: userData._id }] }, {}, { sort: { date_created: -1 } }).lean();
        } else {
            postsQuery = await Posts.find({ content : { $regex: query } }, {}, { sort: { date_created: -1 } }).lean();
        }

        const posts = await Promise.all(postsQuery.map(async (post) => {
            const user = await User.findOne({ _id: post.author }).lean()
            const comments = await Comments.find({ postId: post._id }).lean();
            const likes = await Likes.find({ postId: post._id }).lean();
            const dislikes = await Dislikes.find({ postId: post._id }).lean();
            return {
                ...post,
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
                        lastName: user.lastName,
                    }
                })),
                likesAuthors: likes.map(like => like.author),
                dislikesAuthors: dislikes.map(dislike => dislike.author)
            }
        }))

        if(posts.length === 0) {
            res.json({ posts: [], success: true, message: "No hay publicaciones." })
        } else {
            res.json({ posts: posts, success: true, message: "Publicaciones obtenidas correctamente" }) // Publicaciones obtenidas correctamente
        }

    } catch (error) {
        res.json({ posts: [], success: false, message : "error al obtener las publicaciones." })
    }
}

module.exports = getPosts