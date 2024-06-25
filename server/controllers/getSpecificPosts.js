const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const Comments = require("../models/Comments.js");

const getSpecificPosts = async (req, res) => {
    const { username } = req.params

    try {
        const user = await User.findOne({ username: username }).lean()

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        } else {
            const postsQuery = await Posts.find({ author: user._id }, {}, { sort: { date_created: -1 } }).lean()

            const posts = await Promise.all(postsQuery.map(async (post) => {
                const user = await User.findOne({ _id: post.author })
                const likes = await Likes.find({ postId: post._id }).lean();
                const dislikes = await Dislikes.find({ postId: post._id }).lean();
                return {
                    ...post,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    createdAt: user.createdAt,
                    likesAuthors: likes.map(like => like.author),
                    dislikesAuthors: dislikes.map(dislike => dislike.author)
                }
            }))

            if(posts.length === 0) {
                res.json({ posts: [], success: true, message: "No hay publicaciones." })
            } else {
                res.json({ posts: posts, success: true, message: "" }) // Publicaciones obtenidas correctamente
            }
        }
    } catch (error) {
        
    }
}

module.exports = getSpecificPosts;