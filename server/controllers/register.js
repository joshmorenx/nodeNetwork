const { request, response } = require("express")
const bcrypt = require("bcrypt");
const fs = require("node:fs");
const path = require("path");
const User = require("../models/User.js");

const register = async (req = request, res = response) => {
    try {
        const { firstName, lastName, email, username, password, pwdConfirmation } = req.body;
    
        const userUploadsPath = path.resolve(__dirname, '../public', 'uploads', 'users', username);
        const userProfileImgPath = path.resolve(__dirname, '../public', 'uploads', 'users', username, 'profile');
        const userGalleryPath = path.resolve(__dirname, '../public', 'uploads', 'users', username, 'gallery');

        const assetsPath = path.resolve(__dirname, '../public', 'assets')

        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });
        errExisting = (err) => {
            return res.status(401).json({ error: err });
        };
        if (firstName=='' || lastName=='' || email=='' || username=='' || password=='' || pwdConfirmation=='') {
            errExisting("Aún faltan datos por llenar");          
        } else if (existingUser && existingEmail) {z
            errExisting("El usuario y el correo ya existen");
        } else if (existingUser || existingEmail) {
            errExisting("El usuario o el correo ya existen");
        } else if (password !== pwdConfirmation) {
            errExisting("Las contraseñas no coinciden");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const lastUser = await User.findOne({}, {}, { sort: { id: -1 } });
            const newId = lastUser ? lastUser.id + 1 : 1;
            const user = new User({ 
                id: newId,
                firstName: firstName,
                lastName: lastName,
                email: email,
                username: username,
                password: hashedPassword,
                profilePicture: path.join(userProfileImgPath, 'profile.jpg'),
                galleryPictures: []
            });
            
            const result = await user.save();

            if(result) {
                if(!fs.existsSync(userUploadsPath)) {
                    fs.mkdirSync(userUploadsPath, { recursive: true });
                    fs.mkdirSync(userProfileImgPath, { recursive: true });

                    fs.copyFileSync(path.join(assetsPath, 'default_avatar.jpg'), path.join(userProfileImgPath, 'profile.jpg'));

                    fs.mkdirSync(userGalleryPath, { recursive: true });
                }
                return res.status(200).json({ msg: " Usuario registrado con éxito, redirigiendo al inicio de sesión", regState: true });
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "Ha ocurrido un error en el servidor" });
    }
};


module.exports = register;