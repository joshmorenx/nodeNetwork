const User = require("../models/User")

const handleTheme = async (req, res) => {
    const { username } = req.usuario
    const { theme } = req.body
    
    try {
        const updateResponse = await User.findOneAndUpdate({ username: username }, { theme: (theme ? "dark" : "light") }, { new: true })
        res.json({ theme: updateResponse.theme, message: "Theme updated", success: true })
    } catch (error) {
        res.status(500).json({ error: error })
    }
    
}

module.exports = handleTheme