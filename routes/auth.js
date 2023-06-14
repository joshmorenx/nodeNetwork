const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const app = express();
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");
require('dotenv').config();

// Configuración de Express.js
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "secreto",
        resave: true,
        saveUninitialized: true,
    })
);

// Ruta de inicio de sesión
app.get("/", (req, res) => {
    res.render("login");
});

app.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const adminPermission = await Permission.findOne({ permissionId: 1 });
    const commonPermission = await Permission.findOne({ permissionId: 2 });

    const existingAdminPermission = user.permissions.find((perm) => perm.equals(adminPermission._id));
    const existingCommonPermission = user.permissions.find((perm) => perm.equals(commonPermission._id));

    if(existingAdminPermission){
        console.log(`${user.username} has admin user privileges`);
        req.session.adminContent = "visible para admins";
    }
    if(existingCommonPermission){
        console.log(`${user.username} has common user privileges`);
        req.session.commonContent = "visible para usuarios normales";
    }
    if(user.permissions.length == 0){
        console.log(`${user.username} has no privileges`);
        req.session.noContent = "aun no tienes privilegios"
    }

    if (!user) {
        return res.render("login", { error: "Usuario no encontrado" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.render("login", { error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, "secreto");

    req.session.username = user.username;
    req.session.firstName = user.firstName;
    req.session.token = token;
    res.redirect("/dashboard");
});

// Ruta de registro
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { firstName, lastName, email, username, password, organizationName, registryNumber } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    const existingRegistryNumber = await User.findOne({ "organization.registryNumber": registryNumber });

    errExisting = (err) => {
        return res.render("register", { error: err });
    }

    if (existingUser && existingEmail && existingRegistryNumber) {
        errExisting("El usuario, el correo y la matrícula ya existen")
    } else if (existingUser || existingEmail || existingRegistryNumber) {
        errExisting('El usuario, el correo o la matrícula ya existen')
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Obtener el último ID registrado
        const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });

        // Calcular el nuevo ID
        const newId = lastUser ? lastUser.id + 1 : 1;

        // Crear el nuevo usuario con el ID autoincremental
        const user = new User({
            id: newId,
            firstName,
            lastName,
            email,
            organization: {
                organizationName,
                registryNumber,
            },
            username,
            password: hashedPassword,
        });

        await user.save();
        res.redirect("/");
    }

});


// Cerrar sesion
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar la sesión:", err);
        }
        res.redirect("/");
    });
});

module.exports = app;
