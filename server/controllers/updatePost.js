const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const updatePost = async (req, res) => {
    const { post_id, content, latitude, longitude } = req.body;

    try {
        const filter = { content: content, latitude: latitude, longitude: longitude };
        const result = await Posts.findOneAndUpdate({ postId: post_id }, filter, {new: true})

        if (!result) {
            return res.status(404).json({ message: "Post no encontrado" });
        } else {
            return res.status(200).json({ message: "Post actualizado correctamente", success: true, post: result });
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = updatePost;
