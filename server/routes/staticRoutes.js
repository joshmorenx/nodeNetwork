const express = require("express");
const router = express.Router()
const path = require('path');
const verifyToken = require("../middlewares/verifyToken.js");

const staticRoutes = () => {

    router.get('/api/public/uploads/users/:username/profile/profile.jpg', verifyToken, (req, res) => { // best way -> in order to set a middleware
        const { username } = req.params
        try {
            res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'profile', 'profile.jpg'))
        } catch (error) {
            res.status(500).send('Error al obtener la imagen de perfil del usuario')
        }
    })

    router.get('/api/public/uploads/users/:username/gallery/:filename', (req, res) => {
        const { username, filename } = req.params
        try {
            res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'gallery', filename))
        } catch (error) {
            res.status(500).send('Error al obtener la imagen de perfil del usuario')
        }
    })

    return router
}

module.exports = staticRoutes