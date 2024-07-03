const express = require("express");
const router = express.Router();
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const logout = require("../controllers/logout.js");

// auth routes
const authRoutes = () => {

    router.post("/api/login/", login);
    router.post("/api/logout/", logout);
    router.post("/api/register/", register);

    return router
}

module.exports = authRoutes 