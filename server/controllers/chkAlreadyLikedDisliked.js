const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const Posts = require("../models/Posts.js");

const chkAlreadyLikedDisliked = async (req, res) => {
    const { post_id } = req.headers;
    const { username } = req.usuario;
}

module.exports = chkAlreadyLikedDisliked