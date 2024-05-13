const express = require("express");
const app = express();
const verificarToken = require("../controllers/verificarToken.js");
const returnUserData = require("../controllers/returnUserData.js");
const getAllUsers = require("../controllers/getAllUsers.js");

app.get('/api/usuario/', verificarToken, returnUserData);
app.get("/api/usuarios", getAllUsers)

module.exports = app