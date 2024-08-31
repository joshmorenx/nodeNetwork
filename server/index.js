const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose"); // Asegúrate de tener mongoose instalado
const http = require("http"); // Para crear el servidor HTTP
const { Server } = require("socket.io"); // Importar Server de socket.io

const Notifications = require("./models/Notifications.js");
const Posts = require("./models/Posts.js");
const User = require("./models/User.js");

const connectDB = require("./connectDB.js");
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
    'https://node-network-chi.vercel.app',
    'https://nodenetwork.onrender.com'
];

// Crear servidor HTTP y servidor de Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: allowedOrigins
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, './public/uploads/users'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

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

// Configurar Socket.IO para escuchar cambios en la colección de notificaciones
mongoose.connection.once("open", () => {
    console.log("Conexión a Notificaciones establecida");

    const changeStream = Posts.watch();

    changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
            const posts = change.fullDocument;
            io.emit("newNotification", posts);
        } else if (change.operationType === "delete") {
            const deletedPostId = change.documentKey._id;
            io.emit("deleteNotification", deletedPostId);
        }
    });
});

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on('username', async (username) => {
        if(username) {
            console.log(`El cliente ${username} se ha conectado`);
            const user = await User.findOne({ username: username });
            // Obtener las notificaciones de la base de datos   
            const posts = await Posts.find({ author: user._id }, {}, { sort: { date_created: -1 } }).lean();
            socket.emit("posts", posts)
        }
    });
    
    // Manejar la desconexión del cliente
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
