const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const updateProfile = require("../controllers/updateProfile.js");
const getSpecificUserData = require("../controllers/getSpecificUserData.js");

const userRoutes = (upload) => {

    router.get('/api/usuario/', verifyToken, returnUserData);
    router.get('/api/usuarios/', getAllUsers);
    router.get('/api/getSpecificUserData/:username', verifyToken, getSpecificUserData);
    router.post('/api/updateProfile/', verifyToken, upload.single('image'), updateProfile);

    return router;
};

module.exports = userRoutes;
