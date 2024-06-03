const express = require("express");
const verifyToken = require("../controllers/verifyToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const updateProfile = require("../controllers/updateProfile.js");

const userRoutes = (upload) => {
    const router = express.Router();

    router.get('/api/usuario/', verifyToken, returnUserData);
    router.get('/api/usuarios/', getAllUsers);
    router.post('/api/updateProfile/', verifyToken, upload.single('image'), updateProfile);

    return router;
};

module.exports = userRoutes;
