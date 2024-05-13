const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
const app = express();
// const User = require("../models/User.js");
// const Permission = require("../models/Permission.js");
const login = require("../controllers/login.js");
const register = require("../controllers/register.js");
const logout = require("../controllers/logout.js");
const path = require("path");

// auth routes
app.post("/", login);
app.post("/logout/", logout);
app.post("/register/", register);

module.exports = app;   