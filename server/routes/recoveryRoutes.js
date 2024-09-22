const express = require("express");
const router = express.Router();
const generateRecoveryLink = require("../controllers/generateRecoveryLink.js")

const recoveryRoutes = () => {
    router.post("/api/generateRecoveryLink/",generateRecoveryLink)
    return router
}

module.exports = recoveryRoutes;