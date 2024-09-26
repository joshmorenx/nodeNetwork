const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const generateRecoveryLink = (transporter) => {
    return async (req, res) => {
        try {
            const { username } = req.body
            const usr = username.toLowerCase()

            const user = await User.findOne({ username: usr }).lean()
            const token = jwt.sign({ username: usr }, process.env.SECRET, {
                expiresIn: '15m'
            })

            // encode token so token will not have special characters
            const encodedToken = btoa(token)

            if (user) {
                console.log('sending email...')
                let mail = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'test from nodemailer',
                    text: `click on this link to reset your password: ${process.env.CLIENT_URL}/reset/${encodedToken}`,
                }

                transporter.sendMail(mail, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("email sent");
                    }
                })
            }

            return res.status(200).json({ userFound: user ? 'found' : 'notFound', emailSent: user ? true : false })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}

module.exports = generateRecoveryLink;