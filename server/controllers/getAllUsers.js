const { request, response } = require("express")
const User = require("../models/User.js");

const getAllUsers = async (req = request, res = response) => {
    // const allUsernames = await User.find({}, { username: 1, _id: 0 });
    try {
        const allUsernames = await User.find({},{password:0}).lean();
        return res.status(200).json({usernames : allUsernames});
        // req.usernames = allUsernames
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
}

module.exports = getAllUsers;