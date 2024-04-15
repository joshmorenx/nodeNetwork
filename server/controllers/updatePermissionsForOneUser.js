const { request, response } = require("express")
const User = require("../models/User.js");


const updatePermissionsForOneUser = async (req = request, res = response) => {
    const { newPermissions, username } = req.params
    try {
        const user = await User.findOne({ username: username })
        user.permissions = newPermissions
        await user.save()
        res.status(200).json({ success: true, msg: "Permisos actualizados" })
    } catch (error) {
        res.json({ error: error })
    }
}

module.exports = updatePermissionsForOneUser