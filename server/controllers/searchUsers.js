const User = require("../models/User.js");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const searchUsers = async (req, res) => {
    try {
        const { query } = req.headers;

        if (!query) {
            return res.json({ users: [], success: true, message: "No hay usuarios." });
        }

        // Split into words so multi-word queries (e.g. "josh moreno")
        // match across fields: each word must match username, first or last name
        const words = query.trim().split(/\s+/).filter(Boolean);

        if (words.length === 0) {
            return res.json({ users: [], success: true, message: "No se encontraron usuarios." });
        }

        const andConditions = words.map((word) => ({
            $or: [
                { username: { $regex: escapeRegex(word), $options: "i" } },
                { firstName: { $regex: escapeRegex(word), $options: "i" } },
                { lastName: { $regex: escapeRegex(word), $options: "i" } }
            ]
        }));

        const users = await User.find({ $and: andConditions }, { password: 0 })
            .sort({ createdAt: -1 })
            .limit(10)
            .lean();

        if (users.length === 0) {
            res.json({ users: [], success: true, message: "No se encontraron usuarios." });
        } else {
            res.json({ users: users, success: true, message: "Usuarios obtenidos correctamente." });
        }

    } catch (error) {
        res.json({ users: [], success: false, message: "Error al obtener los usuarios." });
    }
}

module.exports = searchUsers
