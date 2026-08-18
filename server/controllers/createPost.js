const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const { savePostImage, savePostVideo } = require("../utils/savePostMedia.js");
const notifyMentions = require("../utils/notifyMentions.js");

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

        if (!content) {
            return res.json({ message: "Faltan datos" });
        }

        const imageFile = req.files && req.files.image ? req.files.image[0] : null;
        const videoFile = req.files && req.files.video ? req.files.video[0] : null;

        // Guardar la imagen (si viene) en la galería
        if (imageFile) {
            post.images.push(await savePostImage(imageFile, username));
        }

        // Guardar el video (si viene) en la galería
        if (videoFile) {
            post.videos.push(savePostVideo(videoFile, username));
        }

        await post.save();
        await notifyMentions({ fromUsername: username, content: content, post: post._id, postIdNumber: post.postId, descriptionSuffix: "te mencionó en una publicación" });

        return res.status(200).json({ message: "post creado correctamente", success: true });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
module.exports = createPost;
