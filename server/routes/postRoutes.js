const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
const createPost = require("../controllers/createPost.js");

// const getPosts = require("../controllers/getPosts.js");
// const getPost = require("../controllers/getPost.js");
// const updatePost = require("../controllers/updatePost.js");
// const deletePost = require("../controllers/deletePost.js");

const postRoutes = (upload) => {

    router.post('/api/createNewPost/', verifyToken, upload.single('image'), createPost);

    return router;
};

module.exports = postRoutes;
