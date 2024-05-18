const express = require("express");
const app = express();
const getSelectedUserPermissions = require("../controllers/getSelectedUserPermissions.js");
const updatePermissionsForOneUser = require("../controllers/updatePermissionsForOneUser.js");
const getAllPermissions = require("../controllers/getAllPermissions.js");
const updatePermissions = require("../controllers/modifyPermissions.js");
const getPermissionDescription = require("../controllers/getPermissionDescription.js");
const lastPermission = require("../controllers/lastPermission.js");
const updatePermissionsForOneUserViaCli = require("../controllers/updatePermissionsForOneUserViaCli.js");

app.get("/api/permissions/", getSelectedUserPermissions)
app.post("/api/updatePermissions/", updatePermissionsForOneUser)
app.get("/api/getAllPermissions/", getAllPermissions);
app.post("/api/modifyPermissions/", updatePermissions);
app.get("/api/getPermissionDescription/", getPermissionDescription)
app.post("/api/lastPermission/", lastPermission)

// via cli
app.post("/api/updatePermissionsViaCli/cli/:username/:permissionid/", updatePermissionsForOneUserViaCli)

module.exports = app