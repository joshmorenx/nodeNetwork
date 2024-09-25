const express = require("express");
const { request, response } = require("express");
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");

const returnUserData = async (req = request, res = response) => {
    let userPermissions = [];
    const usuario = req.usuario;

    try {
        const user = await User.findOne({ username: usuario.username })

        for (elem of user.permissions) {
            let assignedPermissions = await Permission.findOne({ _id: elem });
            userPermissions.push(assignedPermissions)
        }

        // Utiliza las propiedades del usuario según sea necesario
        // const { userId, username, firstName, lastName, email, permissions, profilePicture } = usuario;

        return res.status(200).json({ userId: user.id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, permissions: userPermissions, profilePicture: user.profilePicture });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = returnUserData