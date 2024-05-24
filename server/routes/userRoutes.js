const express = require("express");
const verificarToken = require("../controllers/verificarToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const updateProfile = require("../controllers/updateProfile.js");

const userRoutes = (upload) => {
    const router = express.Router();

    router.get('/api/usuario/', verificarToken, returnUserData);
    router.get('/api/usuarios/', getAllUsers);
    router.post('/api/updateProfile/', verificarToken, upload.single('image'), updateProfile);

    return router;
};

module.exports = userRoutes;
