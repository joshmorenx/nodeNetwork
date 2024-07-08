const Posts = require("../models/Posts.js");
const Comments = require("../models/Comments.js");
const Likes = require("../models/Likes.js");
const Dislikes = require("../models/Dislikes.js");
const CommentLikes = require("../models/CommentLikes.js");
const CommentDislikes = require("../models/CommentDislikes.js");

const deletePost = async (req, res) => {
    const { username } = req.usuario
    const { post_id } = req.headers

    try {
        const postData = await Posts.findOne({ postId: post_id }, { _id: 1 }).lean()
        if(postData){
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

    console.log(username);
}

module.exports = deletePost