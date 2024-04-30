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
    const { userId, username, firstName, lastName, email, permissions } = usuario;

    res.json({ userId, username, firstName, lastName, email, permissions });
});

app.get("/api/usuarios", getAllUsers)
app.get("/api/permissions/", getSelectedUserPermissions)
app.post("/api/update_permissions/", updatePermissionsForOneUser)

app.get('/api/getAllPermissions/', getAllPermissions);
app.post('/api/modifyPermissions/', updatePermissions);
app.get("/api/getPermissionDescription", getPermissionDescription)

app.post('/api/lastPermission/',async (req, res) => {
    const { typeUpdate, permId, permName } = req.body
    
    
    const usersThatUseThisPermission = []
    // check if that permission is being used by another user if not delete it

    const perm_Id = await Permission.findOne({ permissionId: permId });
    const filteredUser = await User.find({ permissions: perm_Id._id });

    const lastPermissionRegistry = await Permission.findOne({},{permissionId:1},{sort:{ permissionId: -1 }});
    
    filteredUser.map((user) => {
        usersThatUseThisPermission.push(user.username)
    })

    try {
        const lastPermissionRegistry = await Permission.findOne({},{permissionId:1},{sort:{ permissionId: -1 }});
        if(typeUpdate === 'add') {
            const newPermission = new Permission({
                permissionId: lastPermissionRegistry.permissionId + 1,
                permissionName: permName,
                permissionDescription: permDescription
            })
        
            const result = await newPermission.save();

        if(result) {
            res.json({message:"Permiso creado correctamente"});
        }

        }

        else if(typeUpdate === 'remove') {
            if(usersThatUseThisPermission.length > 0) {
                res.json({message:"No se puede borrar el permiso ya que esta siendo usado por otro usuario.", usersThatUseThisPermission: usersThatUseThisPermission});
            } else {
                const result = await Permission.deleteOne({ permissionId: permId });
                if(result) {
                    res.json({message:"Permiso borrado correctamente"});
                }
            }
        }
    } catch (error) {
        return res.json({ message: error });
    }
    
})

module.exports = app;   