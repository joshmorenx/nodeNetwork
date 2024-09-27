const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcrypt');

const verifyExpiredToken = async (req, res) => {
    // this is not a middleware
    const { token } = req.query;
    // const decodedTkn = atob(token);
    const decodedTkn = Buffer.from(token, 'base64').toString('utf-8');
    
    try {
        if (token) {
            jwt.verify(decodedTkn, process.env.SECRET, async (error, decodedToken) => {
                if (error) {
                    if (error.name === 'TokenExpiredError') {
                        res.status(401).json({ message: 'Token expirado', expired: true });
                    } else {
                        res.status(401).json({ message: 'Token no válido', success: false });
                    }
                } else {

                    // verify if decodedTkn exists in User collection
                    const user = await User.findOne({ username: decodedToken.username }).lean();

                    if (user) {
                        if (user.passwordRecoveryUsedTokens && user.passwordRecoveryUsedTokens.length > 0 && user.passwordRecoveryUsedTokens.includes(token)) {
                            return res.status(401).json({ message: 'Token ya usado', success: false });
                        } else {
                            res.status(200).json({ message: 'Token verificado', success: true, decodedToken: decodedToken });
                        }
                    } else {
                        return res.status(401).json({ message: 'Token no válido', success: false });
                    }
                }
            });
        }
        else {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = verifyExpiredToken