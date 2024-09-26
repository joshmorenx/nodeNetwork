const jwt = require("jsonwebtoken");

const verifyExpiredToken = (req, res) => {
    // this is not a middleware
    const { token } = req.query;
    const decodedTkn = atob(token);

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    jwt.verify(decodedTkn, process.env.SECRET, (error, decodedToken) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Token expirado', expired: true });
            } else {
                res.status(401).json({ message: 'Token no válido', success: false });
            }
        } else {
            res.status(200).json({ message: 'Token verificado', success: true , decodedToken: decodedToken });
        }
    });
}

module.exports = verifyExpiredToken