const express = require("express");
const app = express()
const path = require('path');

// static files
app.use('/api/public/', express.static(path.join(__dirname, '../public')))

// get static profile user picture
// server\public\uploads\users\joshmorenx\profile\profile.jpg
// app.get('/api/public/uploads/users/:username/profile/profile.jpg', (req, res) => {
//     const { username } = req.params
//     try {
//         res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'profile', 'profile.jpg'))
//     } catch (error) {
//         res.status(500).send('Error al obtener la imagen de perfil del usuario')
//     }
// })


module.exports = app