const express = require("express");
const router = express.Router();
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const logout = require("../controllers/logout.js");
const verifyValidEmail = require("../middlewares/verifyValidEmail.js");

// auth routes
const authRoutes = () => {

    router.post("/api/login/", login);
    router.post("/api/logout/", logout);
    router.post("/api/register/", verifyValidEmail, register);

    return router
}

module.exports = authRoutes 