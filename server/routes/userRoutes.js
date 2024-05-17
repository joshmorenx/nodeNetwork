const express = require("express");
const app = express();
const verificarToken = require("../controllers/verificarToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const updateProfile = require("../controllers/updateProfile.js");

app.get('/api/usuario/', verificarToken, returnUserData);
app.get("/api/usuarios", getAllUsers)
app.post('/api/updateProfile/', verificarToken, updateProfile);

module.exports = app