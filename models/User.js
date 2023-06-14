const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PermissionSchema = require("./Permission.js");
require('dotenv').config();

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
        console.log("Conectado a MongoDB USUARIOS");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

const UserSchema = new Schema({
    id: { type: Number, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    organization: {
        organizationName: { type: String },
        registryNumber: { type: Number, unique: true }
    },
    username: { type: String, unique: true },
    password: { type: String },
    permissions: [{ type: Schema.Types.ObjectId, ref: "PermissionSchema" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;