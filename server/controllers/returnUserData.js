const express = require("express");
const { request, response } = require("express");

const returnUserData = (req = request, res = response) => {
    const usuario = req.usuario;

    // Utiliza las propiedades del usuario según sea necesario
    const { userId, username, firstName, lastName, email, permissions, profilePicture } = usuario;

    res.json({ userId, username, firstName, lastName, email, permissions, profilePicture });
}

module.exports = returnUserData