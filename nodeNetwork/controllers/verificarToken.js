const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ mensaje: 'Token no válido' });
        }

        // Añade el contenido del token al objeto de solicitud (req) para que pueda ser utilizado en la ruta
        req.usuario = decodedToken;
        next();
    });
};

module.exports = verificarToken;
