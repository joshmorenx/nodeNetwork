const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");

const getRelationship = async (req, res) => {
    try {
        const { username } = req.usuario;
        const { username_to_follow } = req.headers;

        const from = await User.findOne({ username: username }).lean();
        const to = await User.findOne({ username: username_to_follow }).lean();

        const relationshipExists = await Relationships.findOne({ from: from._id, to: to._id })

        if (relationshipExists) {
            res.status(200).json({ isFollowing: relationshipExists, success: true });
        } else {
            res.status(200).json({ isFollowing: false, success: true });
        }
    } catch (error) {
        console.log(error);
        res.json({ error: error });
    }
};

module.exports = getRelationship
        