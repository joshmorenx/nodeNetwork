const { request, response } = require("express");
const User = require("../models/User.js");

const updateProfile = async (req = request, res = response) => {

    const { username } = req.usuario
    const { firstName, lastName, email } = req.body

    res.status(200).json({ message: "Actualización exitosa", success: true })
}

module.exports = updateProfile