const { request, response } = require("express");
const Permission = require("../models/Permission.js");

const getAllPermissions = async (req, res) => {
    try {
        const allPermissionDetails = await Permission.find({ }, { _id: 0 });
        return res.json({allPermissionDetails: allPermissionDetails});
    } catch (error) {
        return res.json({ error: error });
    }
}

module.exports = getAllPermissions