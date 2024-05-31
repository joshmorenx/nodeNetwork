const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PermissionSchema = require("./Permission.js");
require('dotenv').config();

// Definición del modelo de usuarios
const UserSchema = new Schema({
    id: { type: Number, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    isLogged: { type: Boolean, default: false },
    permissions: [{ type: Schema.Types.ObjectId, ref: "PermissionSchema" }],
    profilePicture: { type: String },
    galleryPictures: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;