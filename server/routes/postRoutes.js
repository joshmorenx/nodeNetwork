const express = require("express");
const app = express();
const Posts = require("../models/Posts.js");
const verifyToken = require("../controllers/verifyToken.js");

// const verifyToken = require("../controllers/verifyToken.js");
// const getPosts = require("../controllers/getPosts.js");
// const getPost = require("../controllers/getPost.js");
// const createPost = require("../controllers/createPost.js");
// const updatePost = require("../controllers/updatePost.js");
// const deletePost = require("../controllers/deletePost.js");

const postRoutes = (upload) => {
    const router = express.Router();

    router.post('/api/createNewPost/', verifyToken, upload.single('image'), async (req = request, res = response) => {
        const { content, latitude, longitude } = req.body
        if (await content) {
            res.status(200).json({message: `post creado correctamente (aun no implementado pero esta respuesta es desde el backend), esto fue lo que escribiste: ${content}`});
        }
    });

    return router;
};

module.exports = postRoutes;
