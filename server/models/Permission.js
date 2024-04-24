const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
        console.log("Conectado a MongoDB PERMISOS");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });

// Definición del modelo de permisos
const PermissionSchema = new Schema({
    permissionId: { type: Number, unique: true },
    permissionName: { type: String },
    permissionDescription: { type: String },
});

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = Permission;
