const express = require("express");
const router = express.Router()
const path = require('path');

const staticRoutes = () => {
    // static files
    // router.use('/api/public/', express.static(path.join(__dirname, '../public')))  // the ez way

    // get static profile user picture
    // server\public\uploads\users\joshmorenx\profile\profile.jpg

    router.get('/api/public/uploads/users/:username/profile/profile.jpg', /*middleware,*/ (req, res) => { // best way -> in order to set a middleware
        const { username } = req.params
        try {
            res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'profile', 'profile.jpg'))
        } catch (error) {
            res.status(500).send('Error al obtener la imagen de perfil del usuario')
        }
    })

    return router
}

module.exports = staticRoutes