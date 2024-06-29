const User = require("../models/User.js");
const Posts = require("../models/Posts.js");
const Comments = require("../models/Comments.js");

const addComment = async (req, res) => {
    
    const { username } = req.usuario;
    const { postId, content } = req.body;	
    
    try {
        const user = await User.findOne({ username: username }).lean();
        const post = await Posts.findOne({ postId: postId }).lean();

        const result = await Comments.create({ commentId: await Comments.estimatedDocumentCount() + 1, postId: post._id, author: user._id, content: content });

        if(result){
            const newCurrentComments = await Comments.find({ postId: post._id }).lean();
            res.json({ success: true, message: "Comentario creado correctamente", newCurrentComments: await Promise.all(newCurrentComments.map(async (comment) => {
                const user = await User.findOne({ _id: comment.author }).lean();
                return {
                    ...comment,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }))});
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = addComment;