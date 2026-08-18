const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User.js");

const getGalleryFolder = (username) => path.join(__dirname, `../public/uploads/users/${username}/gallery/`);

// Guarda una imagen subida en la galería del usuario y devuelve su ruta pública
const savePostImage = async (file, username) => {
    const galleryFolderPath = getGalleryFolder(username);

    if (!fs.existsSync(galleryFolderPath)) {
        fs.mkdirSync(galleryFolderPath, { recursive: true });
    }

    const buffer = await sharp(file.path)
        .resize({ width: 736, height: 736 })
        .toBuffer();

    const uniqueFileName = `${uuidv4()}.jpg`;
    const galleryImagePath = path.join(galleryFolderPath, uniqueFileName);
    const relativePath = `/api/public/uploads/users/${username}/gallery/${uniqueFileName}`;

    // Añadir la imagen a la galería del usuario
    const user = await User.findOne({ username }).lean();
    if (user) {
        user.galleryPictures.push(relativePath);
        await User.findOneAndUpdate({ username }, { $set: { galleryPictures: user.galleryPictures } }, { new: true });
    }

    // Guardar la imagen en la galería
    fs.writeFileSync(galleryImagePath, buffer);

    sharp.cache(false); // Dejar de usar la imagen para poder eliminarla del lugar temporal
    fs.unlinkSync(file.path);

    return relativePath;
};

// Guarda un video subido en la galería del usuario y devuelve su ruta pública
const savePostVideo = (file, username) => {
    const galleryFolderPath = getGalleryFolder(username);

    if (!fs.existsSync(galleryFolderPath)) {
        fs.mkdirSync(galleryFolderPath, { recursive: true });
    }

    const extension = path.extname(file.originalname) || '.mp4';
    const uniqueFileName = `${uuidv4()}${extension}`;
    const galleryVideoPath = path.join(galleryFolderPath, uniqueFileName);
    const relativePath = `/api/public/uploads/users/${username}/gallery/${uniqueFileName}`;

    fs.copyFileSync(file.path, galleryVideoPath);
    fs.unlinkSync(file.path);

    return relativePath;
};

module.exports = { savePostImage, savePostVideo };
