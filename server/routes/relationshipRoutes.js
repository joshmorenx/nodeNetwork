const express = require("express");
const router = express.Router();
const verifyToken = require("../controllers/verifyToken.js");
// const getRelationships = require("../controllers/getRelationships.js");
const getRelationship = require("../controllers/getRelationship.js");
// const updateRelationship = require("../controllers/updateRelationship.js");
const deleteRelationship = require("../controllers/deleteRelationship.js");
const createRelationship = require("../controllers/createRelationship.js");
const getRelationships = require("../controllers/getRelationships.js");

const relationshipRoutes = () => {
    router.use(verifyToken);
    router.get("/api/relationships/", getRelationships);
    router.get("/api/relationship/", getRelationship);
    // router.put("/api/relationship/:id", updateRelationship);
    router.delete("/api/relationship/", deleteRelationship);
    router.post("/api/relationship/", createRelationship);
    return router;
};

module.exports = relationshipRoutes