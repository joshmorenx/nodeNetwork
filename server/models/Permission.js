const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definición del modelo de permisos
const PermissionSchema = new Schema({
    permissionId: { type: Number, unique: true },
    permissionName: { type: String },
    permissionDescription: { type: String },
});

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
