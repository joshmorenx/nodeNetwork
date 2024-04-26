const {request, response} = require("express")
const Permission = require("../models/Permission.js");

const getPermissionDescription = async (req=request, res = response) => {
    const { id } = req.body
    try {
        const permission = await Permission.findOne({ permissionId: id })
        res.json({ permissionDescription: permission.permissionDescription })
    } catch (error) {
        res.json({ mess: error })
    }
}

module.exports = getPermissionDescription