const express = require("express");
const router = express.Router()
const getSelectedUserPermissions = require("../controllers/getSelectedUserPermissions.js");
const updatePermissionsForOneUser = require("../controllers/updatePermissionsForOneUser.js");
const getAllPermissions = require("../controllers/getAllPermissions.js");
const updatePermissions = require("../controllers/modifyPermissions.js");
const getPermissionDescription = require("../controllers/getPermissionDescription.js");
const lastPermission = require("../controllers/lastPermission.js");
// const updatePermissionsForOneUserViaCli = require("../controllers/updatePermissionsForOneUserViaCli.js"); // if needed, delete the coment
const verifyToken = require("../middlewares/verifyToken.js");

const permissionRoutes = () => {

    router.get("/api/permissions/", verifyToken, getSelectedUserPermissions);
    router.post("/api/updatePermissions/", verifyToken, updatePermissionsForOneUser)
    router.get("/api/getAllPermissions/", verifyToken, getAllPermissions);
    router.post("/api/modifyPermissions/", verifyToken, updatePermissions);
    router.get("/api/getPermissionDescription/", verifyToken, getPermissionDescription);
    router.post("/api/lastPermission/", verifyToken, lastPermission);

    // via cli
    // router.post("/api/updatePermissionsViaCli/cli/:username/:permissionid/", updatePermissionsForOneUserViaCli) //not needed anymore, first registered user will always have administrator rights

    return router
}

module.exports = permissionRoutes