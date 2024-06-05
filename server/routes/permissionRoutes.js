const express = require("express");
const router = express.Router()
const getSelectedUserPermissions = require("../controllers/getSelectedUserPermissions.js");
const updatePermissionsForOneUser = require("../controllers/updatePermissionsForOneUser.js");
const getAllPermissions = require("../controllers/getAllPermissions.js");
const updatePermissions = require("../controllers/modifyPermissions.js");
const getPermissionDescription = require("../controllers/getPermissionDescription.js");
const lastPermission = require("../controllers/lastPermission.js");
const updatePermissionsForOneUserViaCli = require("../controllers/updatePermissionsForOneUserViaCli.js");

const permissionRoutes = () => {

    router.get("/api/permissions/", getSelectedUserPermissions)
    router.post("/api/updatePermissions/", updatePermissionsForOneUser)
    router.get("/api/getAllPermissions/", getAllPermissions);
    router.post("/api/modifyPermissions/", updatePermissions);
    router.get("/api/getPermissionDescription/", getPermissionDescription)
    router.post("/api/lastPermission/", lastPermission)

    // via cli
    router.post("/api/updatePermissionsViaCli/cli/:username/:permissionid/", updatePermissionsForOneUserViaCli)

    return router    
}


module.exports = permissionRoutes