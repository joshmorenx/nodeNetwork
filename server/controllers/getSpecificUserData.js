const { request, response } = require("express");
const User = require("../models/User.js");

const getSpecificUserData = async (req = request, res = response) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }, { password: 0 }).lean();
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        } else {
            return res.status(200).json({ user });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = getSpecificUserData;