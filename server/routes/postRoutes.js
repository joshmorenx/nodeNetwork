const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
const createPost = require("../controllers/createPost.js");
const getPosts = require("../controllers/getPosts.js");
const getSpecificPosts = require("../controllers/getSpecificPosts.js");
const retrieveLikesDislikes = require("../controllers/retrieveLikesDislikes.js");
const setLikeOrDislike = require("../controllers/setLikeOrDislike.js");

// const getPosts = require("../controllers/getPosts.js");
// const getPost = require("../controllers/getPost.js");
// const updatePost = require("../controllers/updatePost.js");
// const deletePost = require("../controllers/deletePost.js");

const postRoutes = (upload) => {

    router.use(verifyToken);

    router.post('/api/createNewPost/', upload.single('image'), createPost);
    router.get('/api/getPosts/', getPosts);
    router.get ('/api/getSpecificPosts/:username/', getSpecificPosts)

    router.get('/api/likeOrDislike/', retrieveLikesDislikes);
    router.post('/api/likeOrDislike/', setLikeOrDislike);

    return router;
};

module.exports = postRoutes;
