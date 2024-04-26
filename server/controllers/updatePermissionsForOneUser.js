const { request, response } = require("express")
const User = require("../models/User.js");


const updatePermissionsForOneUser = async (req = request, res = response) => {
    const { newPermissions, username } = req.body
    try {
        if (!newPermissions || !username) {
            // return res.status(400).json({ error: "Faltan datos" , message: "Faltan datos" })
            return res.json({ error: "Faltan datos" , message: "Faltan datos" })
        }
        const user = await User.findOne({ username: username })
        if (!user) {
            // return res.status(404).json({ error: "Usuario no encontrado", message: "Usuario no encontrado" })
            return res.json({ error: "Usuario no encontrado", message: "Usuario no encontrado" })
        }
        user.permissions = newPermissions
        const result = await user.save()
        if(result) {
            return res.status(200).json({ message: "Permisos actualizados correctamente para este usuario", success: true })
        }
    } catch (error) {
        res.json({ error: error })
    }
}

module.exports = updatePermissionsForOneUser;