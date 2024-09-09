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
const deletePost = require("../controllers/deletePost.js");
const updatePost = require("../controllers/updatePost.js");
const getSinglePost = require("../controllers/getSinglePost.js");
const deleteComment = require("../controllers/deleteComment.js");
const updateComment = require("../controllers/updateComment.js");

// /api/updateComment/

const postRoutes = (upload) => {

    router.use(verifyToken);

    router.post('/api/createNewPost/', upload.single('image'), createPost);
    router.get('/api/getPosts/', getPosts);
    router.get ('/api/getSpecificPosts/:username/', getSpecificPosts)

    router.post('/api/likeOrDislike/', setLikeOrDislike);

    router.post('/api/comment/', addComment)
    router.get('/api/comment/', getCommentLikesAndDislikes);
    router.delete('/api/comment/', deleteComment)
    router.put('/api/comment/', upload.single('image'), updateComment)

    router.post('/api/comment/like/', commentLike)
    router.post('/api/comment/dislike/', commentDislike)

    router.delete('/api/deletePost/', deletePost);
    router.put('/api/updatePost/', upload.single('image'), updatePost);

    router.get('/api/getSinglePost/', getSinglePost)
    
    return router;
};

module.exports = postRoutes;
