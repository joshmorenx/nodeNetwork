const User = require("../models/User.js");
const Relationships = require("../models/Relationships.js");
const Notifications = require("../models/Notifications.js");

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

        const latestNotification = await Notifications.findOne({}, {}, { sort: { notificationId: -1 } }).lean()
        const notificationAlreadyExists = await Notifications.findOne({ from: from._id, reason: "follow", to: to._id });

        if (!notificationAlreadyExists && from._id.equals(to._id) === false) {
            await Notifications.create({ from: from._id, reason: "follow", to: to._id, notificationId: latestNotification === null ? 1 : latestNotification.notificationId + 1, description: `${from.username} te ha comenzado a seguir`, followerUsername: from.username });
        }

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