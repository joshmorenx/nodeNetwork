const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require("./User.js");

// Conexión a la base de datos
mongoose
    .connect(
        process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Conectado a MongoDB POSTS");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

const PostSchema = new Schema({
    postId: { type: Number, unique: true },
    title: { type: String },
    content: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "UserSchema" },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;