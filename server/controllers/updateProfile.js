const { request, response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Permission = require("../models/Permission.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');

const updateProfile = async (req = request, res = response) => {
    const addedPermissions = [];
    const { username } = req.usuario;
    const { option, firstName, lastName, email } = req.body; // updating personal data
    const user = await User.findOne({ username: username });
    let token = null;

    try {
        for (let elem of user.permissions) {
            let assignedPermissions = await Permission.findOne({ _id: elem });
            addedPermissions.push(assignedPermissions);
        }

        switch (option) {
            case "name":
                user.firstName = (firstName ? firstName : user.firstName);
                user.lastName = (lastName ? lastName : user.lastName);
                const resultName = await user.save();
                if (resultName) {
                    //regen token
                    token = jwt.sign({ userId: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, isLogged: user.isLogged, permissions: addedPermissions, profilePicture: user.profilePicture }, process.env.SECRET);
                    res.status(200).json({ message: "Nombres actualizados correctamente", success: true, token: token });
                }
                break;

            case "email":
                user.email = (email ? email : user.email);
                const resultEmail = await user.save();
                if (resultEmail) {
                    token = jwt.sign({ userId: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, isLogged: user.isLogged, permissions: addedPermissions, profilePicture: user.profilePicture }, process.env.SECRET);
                    res.status(200).json({ message: "Email actualizado correctamente", success: true, token: token });
                }
                break;

            case "picture":
                if (req.file) {
                    const profileFolderPath = path.join(__dirname, `../public/uploads/users/${username}/profile/`);
                    const galleryFolderPath = path.join(__dirname, `../public/uploads/users/${username}/gallery/`);
                    
                    if (!fs.existsSync(profileFolderPath)) {
                        fs.mkdirSync(profileFolderPath, { recursive: true });
                    }

                    if (!fs.existsSync(galleryFolderPath)) {
                        fs.mkdirSync(galleryFolderPath, { recursive: true });
                    }

                    const imagePath = path.join(profileFolderPath, 'profile.jpg');
                    const buffer = await sharp(req.file.path)
                        .resize({ width: 736, height: 736 })
                        .toBuffer();

                    // Guardar la imagen en el perfil
                    fs.writeFileSync(imagePath, buffer);

                    // Generar un nombre de archivo único para la galería
                    const uniqueFileName = `${uuidv4()}.jpg`;
                    const galleryImagePath = path.join(galleryFolderPath, uniqueFileName);
                    const relativePath = `/api/public/uploads/users/${username}/gallery/${uniqueFileName}`

                    // Guardar la ruta de la imagen en la base de datos
                    let addedGalleryImage = await User.findOne({ username: username }).lean()
                    addedGalleryImage.galleryPictures.push(relativePath)

                    // Guardar la imagen en la base de datos
                    const result = await User.findOneAndUpdate({ username: username }, { $set: { galleryPictures: addedGalleryImage.galleryPictures } }, { new: true })

                    // Guardar la imagen en la galería
                    fs.writeFileSync(galleryImagePath, buffer);

                    sharp.cache(false); // Dejar de usar la imagen para poder eliminarla del lugar temporal

                    fs.unlinkSync(req.file.path);                    

                    token = jwt.sign({ userId: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email, isLogged: user.isLogged, permissions: addedPermissions, profilePicture: user.profilePicture }, process.env.SECRET);
                    res.status(200).json({ message: "Imagen actualizada correctamente", success: true, token: token });
                } else {
                    res.status(400).json({ message: "No se subió ninguna imagen", success: false });
                }
                break;

            default:
                res.status(400).json({ message: "Opción inválida", success: false });
                break;
        }

        if (token) {
            try {
                // req.session.token = token;
            } catch (error) {
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error interno del servidor", success: false });
    }
};

module.exports = updateProfile;
