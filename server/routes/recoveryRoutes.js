const express = require("express");
const router = express.Router();
const generateRecoveryLink = require("../controllers/generateRecoveryLink.js");
const verifyExpiredToken = require("../controllers/verifyExpiredToken.js");
const resetPassword = require("../controllers/resetPassword.js");

const recoveryRoutes = (transporter) => {
    router.post("/api/generateRecoveryLink/", generateRecoveryLink(transporter));
    router.get("/api/verifyExpiredToken/", verifyExpiredToken);
    router.post("/api/resetPassword/", resetPassword);
    return router;
};

module.exports = recoveryRoutes;
