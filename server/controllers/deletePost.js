const fs = require("fs");
const path = require("path");
const Posts = require("../models/Posts.js");
const User = require("../models/User.js");
const Comments = require("../models/Comments.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");

const deletePost = async (req, res) => {
    const { username } = req.usuario
    const { post_id } = req.headers

    try {
        const postData = await Posts.findOne({ postId: post_id }, { _id: 1, images: 1, videos: 1 }).lean()
        if(postData){
            // Eliminar los archivos multimedia (imágenes y videos) del disco
            const deleteFile = (relativePath) => {
                if (!relativePath) {
                    return;
                }
                const filename = relativePath.split('/').pop();
                const filePath = path.join(__dirname, `../public/uploads/users/${username}/gallery/${filename}`);
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {
                    console.error('Error al eliminar el archivo multimedia:', err);
                }
            };

            (postData.images || []).forEach(deleteFile);
            (postData.videos || []).forEach(deleteFile);

            // Quitar las imágenes eliminadas de la galería del usuario en la DB
            if (postData.images && postData.images.length > 0) {
                await User.updateOne({ username }, { $pullAll: { galleryPictures: postData.images } });
            }

            const comment = await Comments.find({ postId: postData }, { _id: 1 }).lean()
            await CommentLikes.deleteMany({commentId: { $in: comment } })
            await CommentDislikes.deleteMany({commentId: { $in: comment } })
            await Comments.deleteMany({ postId: postData })
            await Likes.deleteMany({ postId: postData })
            await Dislikes.deleteMany({ postId: postData })
            await Posts.deleteOne({ _id: postData })

            res.json({ success: true, message:'Publicacion eliminada' })
        }
        

    } catch (error) {
        console.log(error)
    }
}

module.exports = deletePost