const Notifications = require("../models/Notifications.js");

const updateReadNotification = async (req, res) => {
    const { id } = req.body
    
    try {
        const filter = { read: true }        
        const result = await Notifications.findOneAndUpdate({ notificationId: id, read: false }, filter, { new: true })
        
        if (result) {
            return res.status(200).json({ message: "Notificación leida", success: true, notification: result })
        } else {
            return res.status(404).json({ message: "Notificación no encontrada", success: false })
        }        
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = updateReadNotification