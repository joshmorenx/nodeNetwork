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
// Cerrar sesion

app.post("/logout", logout);

// Ruta de registro
// app.get("/register", (req, res) => {
//     res.render("register");
// });

// app.get("/register", register);
app.post("/register", register);

// app.post("/xd", async (req, res) => {
//     const { firstName, lastName, email, username, password, pwdConfirmation } = req.body;
//     const existingUser = await User.findOne({ username });
//     const existingEmail = await User.findOne({ email });
//     // const existingRegistryNumber = await User.findOne({ "organization.registryNumber": registryNumber });

//     errExisting = (err) => {
//         return res.render("register", { error: err });
//     }

//     if ( existingUser && existingEmail ) {
//         errExisting("El usuario, el correo y la matrícula ya existen")
//     } else if ( existingUser || existingEmail ) {
//         errExisting('El usuario, el correo o la matrícula ya existen')
//     } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         // Obtener el último ID registrado
//         const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });

//         // Calcular el nuevo ID
//         const newId = lastUser ? lastUser.id + 1 : 1;

//         // Crear el nuevo usuario con el ID autoincremental
//         const user = new User({
//             id: newId,
//             firstName,
//             lastName,
//             email,
//             username,
//             password: hashedPassword,
//         });

//         await user.save();
//         res.redirect("/");
//     }

// });

app.get('/api/usuario', verificarToken, (req, res) => {
    const usuario = req.usuario;

    // Utiliza las propiedades del usuario según sea necesario
    const { userId, username, email, permissions} = usuario;

    res.json({ userId, username, email, permissions});
});

app.get('/api/usuarios', async (req, res) => {
    const allUsernames = await User.find({}, { username: 1, _id: 0 });
    return res.status(200).json({usernames : allUsernames});
})
module.exports = app;
