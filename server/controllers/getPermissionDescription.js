const {request, response} = require("express")
const Permission = require("../models/Permission.js");

const getPermissionDescription = async (req=request, res = response) => {
    const { id } = req.headers
    try {
        if(id) {
            const permission = await Permission.findOne({ permissionId: id })
            res.json({ description: permission.permissionDescription })
        } else {
            res.json({ description: "" })
        }
    } catch (error) {
        res.json({ mess: error })
    }
}

module.exports = getPermissionDescription