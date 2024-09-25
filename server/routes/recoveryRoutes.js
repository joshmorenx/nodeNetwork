const express = require("express");
const router = express.Router();
const generateRecoveryLink = require("../controllers/generateRecoveryLink.js");

const recoveryRoutes = (transporter) => {
    // Pasa `transporter` a `generateRecoveryLink`
    router.post("/api/generateRecoveryLink/", generateRecoveryLink(transporter));
    return router;
};

module.exports = recoveryRoutes;
