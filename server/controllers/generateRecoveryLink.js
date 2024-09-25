const User = require('../models/User.js')
const generateRecoveryLink = async (req, res) => {
    try {
        const { username } = req.body
        console.log(username)

        const user = await User.findOne({ username: username }).lean()
        return res.status(200).json({ userFound: user ? 'found' : 'notFound', emailSent:  user ? true : false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
}

module.exports = generateRecoveryLink;