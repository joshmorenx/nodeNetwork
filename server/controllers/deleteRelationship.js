const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");

const deleteRelationship = async (req, res) => {
    
    const { username } = req.usuario;
    const { username_to_unfollow } = req.headers;
    try {
        const from = await User.findOne({ username: username }).lean();
        const to = await User.findOne({ username: username_to_unfollow }).lean();

        const deleteRelationship = await Relationships.findOneAndDelete({ from: from._id, to: to._id });

        if (deleteRelationship) {
            res.status(200).json({ message: "Relacion eliminada correctamente", success: true });
        }
    } catch (error) {
        res.json({ error: error });        
    }
}

module.exports = deleteRelationship