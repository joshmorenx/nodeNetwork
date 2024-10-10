const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const createPost = async (req, res) => {
    try {
        const { username } = req.usuario;
        const { content, latitude, longitude } = req.body;
        const user = await User.findOne({ username: username });
        const lastPostId = await Posts.findOne({}, {}, { sort: { postId: -1 } });
        const newPostId = lastPostId ? lastPostId.postId + 1 : 1;
        const post = new Posts({
            postId: newPostId,
            author: user._id,
            content: content,
            latitude: latitude ? latitude : 0,
            longitude: longitude ? longitude : 0,
            date_created: new Date(),
            date_updated: new Date(),
            images: [],
        });

        if (content) {
            const result = await post.save();
            if (result) {
                res.status(200).json({ message: "post creado correctamente", success: true });
            }
        } else {
            res.json({ message: "Faltan datos" });
        }

        if (req.file) {
            const galleryFolderPath = path.join(__dirname, `../public/uploads/users/${username}/gallery/`);

            if (!fs.existsSync(galleryFolderPath)) {
                fs.mkdirSync(galleryFolderPath, { recursive: true });
            }

            const buffer = await sharp(req.file.path)
                .resize({ width: 736, height: 736 })
                .toBuffer();

            const uniqueFileName = `${uuidv4()}.jpg`;
            const galleryImagePath = path.join(galleryFolderPath, uniqueFileName);
            const relativePath = `/api/public/uploads/users/${username}/gallery/${uniqueFileName}`;

            // Guardar la ruta de la imagen en la base de datos
            let addedGalleryImage = await User.findOne({ username: username }).lean()
            addedGalleryImage.galleryPictures.push(relativePath)

            // Guardar la imagen en la base de datos
            const result = await User.findOneAndUpdate({ username: username }, { $set: { galleryPictures: addedGalleryImage.galleryPictures } }, { new: true })

            // Guardar la imagen en la galería
            fs.writeFileSync(galleryImagePath, buffer);

            sharp.cache(false); // Dejar de usar la imagen para poder eliminarla del lugar temporal

            fs.unlinkSync(req.file.path);

            // Actualizar el post con la ruta de la imagen en la galería
            // post.images.push('/api/' + galleryImagePath.substring(galleryImagePath.indexOf('public')));
            post.images.push(relativePath);
            await post.save();
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
module.exports = createPost;
