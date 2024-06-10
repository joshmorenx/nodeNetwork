const { request, response } = require("express");
const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Friendship = require("../models/Friendship.js");

const getPosts = async (req = request, res = response) => {
    try {
        const { username } = req.usuario;
        const userData = await User.findOne({ username: username });
        const friends = await Friendship.find({ user: userData._id })

        const posts = await Posts.find({ $or: [{ author: { $in: friends.friend } }, { author: userData._id }] }, {}, { sort: { date_created: -1 } })

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