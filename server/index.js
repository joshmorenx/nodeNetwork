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
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // Escuchar el nombre de usuario que el cliente envía
    socket.on('username', async (username) => {
        console.log(`Usuario conectado: ${username}`);

        try {
            // Buscar el ID del usuario en la base de datos usando el nombre de usuario
            const user = await User.findOne({ username })

            if (!user) {
                console.log(`Usuario no encontrado: ${username._id}`);
                return;
            }

            const userId = user._id;

            // Definir el pipeline de agregación para filtrar notificaciones por userId
            const pipeline = [
                {
                    $match: {
                        "fullDocument.to": userId,
                        "fullDocument.read": false
                    }
                }
            ];

            // Crear un changeStream con el pipeline filtrado por userId
            const changeStream = Notifications.watch(pipeline);

            changeStream.on('change', (change) => {
                if (change.operationType === 'insert') {
                    const notification = change.fullDocument;
                    socket.emit('newNotification', notification); // Emitir solo a este socket
                } else if (change.operationType === 'delete') {
                    const deletedNotificationId = change.documentKey._id;
                    socket.emit('deleteNotification', deletedNotificationId); // Emitir solo a este socket
                } //else if (change.operationType === 'update') {
                    //solo el campo read
                    //const updatedNotification = change.fullDocument;
                    //socket.emit('updateNotification', updatedNotification); // Emitir solo a este socket
                //}
            });

            // Limpiar el changeStream cuando el socket se desconecta
            socket.on('disconnect', () => {
                console.log(`Usuario desconectado: ${username}`);
                changeStream.close();
            });
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        }
    });
});


io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on('username', async (username) => {
        if(username) {
            console.log(`El cliente ${username} se ha conectado`);
            const user = await User.findOne({ username: username });
            const notifications = await Notifications.find({ to: user._id, read: false }, {}, { sort: { notificationId: -1 } }).lean();
            socket.emit("notifications", notifications)
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
