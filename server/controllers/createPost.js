const {request, response} = require("express")
const Posts = require("../models/Posts.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const createPost = async (req = request, res = response) => {
    const { username } = req.usuario
    const { content, latitude, longitude } = req.body
    
    if(req.file) {
        const galleryFolderPath = path.join(__dirname, `../public/uploads/users/${username}/gallery/`);

        if (!fs.existsSync(galleryFolderPath)) {
            fs.mkdirSync(galleryFolderPath, { recursive: true });
        }

        const buffer = await sharp(req.file.path)
            .resize({ width: 736, height: 736 })
            .toBuffer();

        const uniqueFileName = `${uuidv4()}.jpg`;
        const galleryImagePath = path.join(galleryFolderPath, uniqueFileName);

        // Guardar la imagen en la galería
        fs.writeFileSync(galleryImagePath, buffer);

        sharp.cache(false); // Dejar de usar la imagen para poder eliminarla del lugar temporal

        fs.unlinkSync(req.file.path);        
    }

    if (content) {
        res.status(200).json({message: `post creado correctamente (aun no implementado pero esta respuesta es desde el backend), esto fue lo que escribiste: ${content}, informacion del usuario: ${username}`});
    }
}
module.exports = createPost