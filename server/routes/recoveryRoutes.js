const express = require("express");
const router = express.Router();
const generateRecoveryLink = require("../controllers/generateRecoveryLink.js");
const verifyExpiredToken = require("../controllers/verifyExpiredToken.js");

const recoveryRoutes = (transporter) => {
    router.post("/api/generateRecoveryLink/", generateRecoveryLink(transporter));
    router.get("/api/verifyExpiredToken/", verifyExpiredToken);
    return router;
};

module.exports = recoveryRoutes;
