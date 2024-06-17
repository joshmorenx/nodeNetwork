const { request, response } = require("express");
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");

const getSpecificUserData = async (req = request, res = response) => {
    const { username } = req.params;
    try {
        const userQuery = await User.findOne({ username }, { password: 0 }).lean();
        const permissionsQuery = await Permission.find({ _id: { $in: userQuery.permissions } }).lean();

        const user = {
            ...userQuery,
            permissions: permissionsQuery
        }

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            return res.status(200).json({ user, success: true });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = getSpecificUserData;