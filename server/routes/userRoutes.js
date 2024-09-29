const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const updateProfile = require("../controllers/updateProfile.js");
const getSpecificUserData = require("../controllers/getSpecificUserData.js");
const handleTheme = require("../controllers/handleTheme.js");
const getUserTheme = require("../controllers/getUserTheme.js");
const verifyValidEmail = require("../middlewares/verifyValidEmail.js");

const userRoutes = (upload) => {

    router.get('/api/usuario/', verifyToken, returnUserData);
    router.get('/api/usuarios/', getAllUsers);
    router.get('/api/getSpecificUserData/:username', verifyToken, getSpecificUserData);
    router.post('/api/updateProfile/', verifyToken, upload.single('image'), verifyValidEmail, updateProfile);
    router.put('/api/handleTheme/', verifyToken, handleTheme)
    router.get('/api/getUserTheme/', verifyToken, getUserTheme)

    return router;
};

module.exports = userRoutes;
