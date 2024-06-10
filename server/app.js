const connectDB = require("./connectDB.js");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const permissionRoutes = require("./routes/permissionRoutes.js");
const staticRoutes = require("./routes/staticRoutes.js");
const postRoutes = require("./routes/postRoutes.js");

const app = express();

// Configuración
require('dotenv').config();

// Conectarse a la base de datos
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:5173'];

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Directorio base, detalles específicos se manejan en el controlador
        cb(null, path.join(__dirname, './public/uploads/users'));
    },
    filename: function (req, file, cb) {
        // Nombre de archivo específico se maneja en el controlador
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Configuración de Express.js
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: true,
//         saveUninitialized: true,
//     })
// );

// Routes
app.use("/", authRoutes());
app.use("/", userRoutes(upload));
app.use("/", permissionRoutes());
app.use("/", staticRoutes());
app.use("/", postRoutes(upload));

// Server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});
