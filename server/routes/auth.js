const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const logout = require("../controllers/logout.js");
const verificarToken = require("../controllers/verificarToken.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const getSelectedUserPermissions = require("../controllers/getSelectedUserPermissions.js");
const updatePermissionsForOneUser = require("../controllers/updatePermissionsForOneUser.js");
const getAllPermissions = require("../controllers/getAllPermissions.js");
const updatePermissions = require("../controllers/modifyPermissions.js");
const getPermissionDescription = require("../controllers/getPermissionDescription.js");
const lastPermission = require("../controllers/lastPermission.js");
const cors = require("cors");

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173']
require('dotenv').config();

app.use(cors({ origin: allowedOrigins }));
// app.use(cors());

// Configuración de Express.js

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        // secret: "secreto",
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.post("/", login);
app.post("/logout/", logout);
app.post("/register/", register);
app.get('/api/usuario/', verificarToken, (req, res) => {
    const usuario = req.usuario;

    // Utiliza las propiedades del usuario según sea necesario
    const { userId, username, firstName, lastName, email, permissions, profilePicture } = usuario;

    res.json({ userId, username, firstName, lastName, email, permissions, profilePicture });
});

app.get("/api/usuarios", getAllUsers)
app.get("/api/permissions/", getSelectedUserPermissions)
app.post("/api/update_permissions/", updatePermissionsForOneUser)

app.get('/api/getAllPermissions/', getAllPermissions);
app.post('/api/modifyPermissions/', updatePermissions);
app.get("/api/getPermissionDescription/", getPermissionDescription)

app.post('/api/lastPermission/', lastPermission)

module.exports = app;   