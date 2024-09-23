const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');  // Necesario para leer archivos del sistema
const verifyToken = require("../middlewares/verifyToken.js");

const staticRoutes = () => {
    // Ruta para obtener la imagen de perfil (ya está bien configurada)
    router.get('/api/public/uploads/users/:username/profile/profile.jpg', verifyToken, (req, res) => {
        const { username } = req.params;
        console.log(username);
        try {
            res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'profile', 'profile.jpg'));
        } catch (error) {
            res.status(500).send('Error al obtener la imagen de perfil del usuario');
        }
    });

    // Ruta para obtener imágenes individuales de la galería (ya está bien configurada)
    router.get('/api/public/uploads/users/:username/gallery/:filename', verifyToken, (req, res) => {
        const { username, filename } = req.params;
        try {
            res.sendFile(path.resolve(__dirname, '../public/uploads/users', username, 'gallery', filename));
        } catch (error) {
            res.status(500).send('Error al obtener la imagen de la galería');
        }
    });

    // Nueva ruta para obtener los nombres de los archivos de la galería del usuario
    router.get('/api/getUserGallery', verifyToken, (req, res) => {
        const { username } = req.query;
        const galleryDir = path.resolve(__dirname, '../public/uploads/users', username, 'gallery');

        try {
            // Leemos el contenido de la carpeta 'gallery' donde están almacenadas las imágenes
            fs.readdir(galleryDir, (err, files) => {
                if (err) {
                    return res.status(500).send('Error al leer los archivos de la galería');
                }

                // Filtramos solo los archivos de imagen
                const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

                // Devolvemos los nombres de las imágenes
                res.json({ galleryPictures: imageFiles });
            });
        } catch (error) {
            res.status(500).send('Error al obtener la galería del usuario');
        }
    });

    return router;
}

module.exports = staticRoutes;
