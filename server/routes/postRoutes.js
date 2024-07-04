const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
const createPost = require("../controllers/createPost.js");
const getPosts = require("../controllers/getPosts.js");
const getSpecificPosts = require("../controllers/getSpecificPosts.js");
const setLikeOrDislike = require("../controllers/setLikeOrDislike.js");
const addComment = require("../controllers/addComment.js");
const getCommentLikesAndDislikes = require("../controllers/getCommentLikesAndDislikes.js");
const commentLike = require("../controllers/commentLike.js");
const commentDislike = require("../controllers/commentDislike.js");

// const getPosts = require("../controllers/getPosts.js");
// const getPost = require("../controllers/getPost.js");
// const updatePost = require("../controllers/updatePost.js");
// const deletePost = require("../controllers/deletePost.js");

const postRoutes = (upload) => {

    router.use(verifyToken);

    router.post('/api/createNewPost/', upload.single('image'), createPost);
    router.get('/api/getPosts/', getPosts);
    router.get ('/api/getSpecificPosts/:username/', getSpecificPosts)

    router.post('/api/likeOrDislike/', setLikeOrDislike);

    router.post('/api/comment/', addComment)
    router.get('/api/comment/', getCommentLikesAndDislikes);

    router.post('/api/comment/like/', commentLike)
    router.post('/api/comment/dislike/', commentDislike)

    return router;
};

module.exports = postRoutes;
