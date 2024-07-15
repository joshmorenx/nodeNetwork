const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const updatePost = async (req, res) => {
    const { username } = req.usuario;
    const { post_id, content, latitude, longitude } = req.body;

    console.log(post_id, id, content, latitude, longitude);
    try {
        const filter = { content: content, latitude: latitude, longitude: longitude };
        const post = await Posts.findOne({ postId: post_id });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = updatePost;
