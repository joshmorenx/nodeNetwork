const { request, response } = require("express");
const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");

const getPosts = async (req = request, res = response) => {
    try {
        const { username } = req.usuario;
        const userData = await User.findOne({ username: username })
        const followings = await Relationships.find({ from: userData._id }).lean();

        const postsQuery = await Posts.find({ $or: [{ author: { $in: followings.map(following => following.to) } }, { author: userData._id }] }, {}, { sort: { date_created: -1 } }).lean();

        const posts = await Promise.all(postsQuery.map(async (post) => {
            const user = await User.findOne({ _id: post.author })
            return {
                ...post,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
        }))

        if(posts.length === 0) {
            res.json({ posts: [], success: true, message: "No hay publicaciones." })
        } else {
            res.json({ posts: posts, success: true, message: "" }) // Publicaciones obtenidas correctamente
        }

    } catch (error) {
        res.json({ posts: [], success: false, message : "error al obtener las publicaciones." })
    }
}

module.exports = getPosts