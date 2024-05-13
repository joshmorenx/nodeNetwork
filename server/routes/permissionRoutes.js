const express = require("express");
const app = express();
const getSelectedUserPermissions = require("../controllers/getSelectedUserPermissions.js");
const updatePermissionsForOneUser = require("../controllers/updatePermissionsForOneUser.js");
const getAllPermissions = require("../controllers/getAllPermissions.js");
const updatePermissions = require("../controllers/modifyPermissions.js");
const getPermissionDescription = require("../controllers/getPermissionDescription.js");
const lastPermission = require("../controllers/lastPermission.js");

app.get("/api/permissions/", getSelectedUserPermissions)
app.post("/api/update_permissions/", updatePermissionsForOneUser)
app.get('/api/getAllPermissions/', getAllPermissions);
app.post('/api/modifyPermissions/', updatePermissions);
app.get("/api/getPermissionDescription/", getPermissionDescription)
app.post('/api/lastPermission/', lastPermission)

module.exports = app