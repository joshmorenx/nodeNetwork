const User = require("../models/User")

const getUserTheme = async (req, res) => {
    const { username } = req.usuario

    try {
        const user = await User.findOne({ username: username }).lean()
        res.json({ theme: user.theme })
    } catch (error) {
        res.status(500).json({error:"An error has occurred while gathering user theme"})
    }
}

module.exports = getUserTheme