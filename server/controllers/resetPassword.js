const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
    const { token, username, password, passwordConfirmation } = req.body
    const decodedTkn = Buffer.from(token, 'base64').toString('utf-8');

    try {
        if (password === passwordConfirmation && decodedTkn) {
            await User.updateOne({ username: username }, { $push: { passwordRecoveryUsedTokens: token } });
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.updateOne({ username: username }, { $set: { password: hashedPassword } })

            return res.json({ success: true, msg: "Contraseña actualizada correctamente" })
        } else {
            return res.status(400).json({ error: "Contraseñas no coinciden" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = resetPassword