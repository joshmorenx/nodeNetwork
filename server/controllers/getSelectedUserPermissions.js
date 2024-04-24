const { request, response } = require("express")
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");


const getSelectedUserPermissions = async (req = request, res = response) => {
    const username = req.headers.username
    try {
        const userInfo = await User.findOne({ username: username }) 
        const assignedPermissions = await Permission.find({ _id: { $in: userInfo.permissions } })
        const unassignedPermissions = await Permission.find({ _id: { $nin: userInfo.permissions } })
        return res.status(200).json({assignedPermissions:assignedPermissions, unassignedPermissions:unassignedPermissions})
    } catch (error) {
        return res.json({ error: error })
    }
}

module.exports = getSelectedUserPermissions