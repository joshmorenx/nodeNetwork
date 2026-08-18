const Posts = require("../models/Posts.js");
const { savePostImage, savePostVideo } = require("../utils/savePostMedia.js");

const updatePost = async (req, res) => {
    const { post_id, content, latitude, longitude } = req.body;

    try {
        const post = await Posts.findOne({ postId: post_id });

        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" });
        }

        post.content = content;
        if (latitude) post.latitude = latitude;
        if (longitude) post.longitude = longitude;
        post.date_updated = new Date();

        const { username } = req.usuario;

        const imageFile = req.files && req.files.image ? req.files.image[0] : null;
        const videoFile = req.files && req.files.video ? req.files.video[0] : null;

        // Si se sube una imagen nueva reemplaza a la anterior; si no, se conserva
        if (imageFile) {
            post.images = [await savePostImage(imageFile, username)];
        }

        // Si se sube un video nuevo reemplaza al anterior; si no, se conserva
        if (videoFile) {
            post.videos = [savePostVideo(videoFile, username)];
        }

        const result = await post.save();

        return res.status(200).json({ message: "Post actualizado correctamente", success: true, post: result });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

module.exports = updatePost;
