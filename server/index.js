const connectDB = require("./connectDB.js");
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const permissionRoutes = require("./routes/permissionRoutes.js");
const staticRoutes = require("./routes/staticRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const relationshipRoutes = require("./routes/relationshipRoutes.js");

const app = express();

// Configuración
require('dotenv').config();

// Conectarse a la base de datos
connectDB();

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'https://node-network-chi.vercel.app', // Añadir la URL del frontend desplegado
    'https://nodenetwork.onrender.com'
];

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
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// healthcheck
app.get("/", (req, res) => {
    res.send({ message: "Server OK" });
});

// Routes
app.use("/", authRoutes());
app.use("/", userRoutes(upload));
app.use("/", permissionRoutes());
app.use("/", staticRoutes());
app.use("/", postRoutes(upload));
app.use("/", relationshipRoutes());

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Error interno del servidor");
});

// Server start
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
