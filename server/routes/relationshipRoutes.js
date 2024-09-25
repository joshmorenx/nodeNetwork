const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const getRelationship = require("../controllers/getRelationship.js");
const deleteRelationship = require("../controllers/deleteRelationship.js");
const createRelationship = require("../controllers/createRelationship.js");
const getRelationships = require("../controllers/getRelationships.js");

const relationshipRoutes = () => {
    router.use(verifyToken);
    router.get("/api/relationships/", getRelationships);
    router.get("/api/relationship/", getRelationship);
    router.delete("/api/relationship/", deleteRelationship);
    router.post("/api/relationship/", createRelationship);
    return router;
};

module.exports = relationshipRoutes