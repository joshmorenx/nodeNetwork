const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");

const createRelationship = async (req, res) => {
    const { username } = req.usuario
    const { username_to_follow } = req.body

    try {
        // console.log(username, username_to_follow);
        const from = await User.findOne({ username: username }).lean()
        const to = await User.findOne({ username: username_to_follow }).lean()

        const relationship = new Relationships({
            from: from._id,
            to: to._id
        })

        const result = await relationship.save()

        if (result) {
            res.status(200).json({ message: "Relacion creada correctamente", success: true })
        } else {
            res.json({ error: "Error al crear la relacion" })
        }

    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
}

module.exports = createRelationship