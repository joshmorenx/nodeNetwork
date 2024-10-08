const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose"); // Asegúrate de tener mongoose instalado
const http = require("http"); // Para crear el servidor HTTP
const { Server } = require("socket.io"); // Importar Server de socket.io
const nodemailer = require("nodemailer");

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
const recoveryRoutes = require("./routes/recoveryRoutes.js");

const app = express();

// Configuración
require('dotenv').config();

// Conectarse a la base de datos
connectDB();

// Autoping para no apagar el servidor
// const autoping = () => {
//     fetch(process.env.SERVER_URL)
//         .then((response) => {
//             if (response.ok) {
//                 // console.log('Ping!');
//             } else {
//                 // console.log('No Ping!');
//             }
//         }).catch((error) => {
//             console.log(error);
//         });
// }

// setInterval(autoping, 60000);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'https://node-network-chi.vercel.app',
    'https://nodenetwork-backend.onrender.com',
    'https://nodenetwork.onrender.com',
    'https://node-network-6r09t66kb-joshmorenxs-projects.vercel.app',
    'https://node-network-joshmorenxs-projects.vercel.app',
    'https://node-network-git-main-joshmorenxs-projects.vercel.app'
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
app.use("/", recoveryRoutes(transporter));
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

    // Escuchar el nombre de usuario que el cliente envía
    socket.on('username', async (username) => {

        if (username) {
            const user = await User.findOne({ username: username });
            const notifications = await Notifications.find({ to: user._id }, {}, { sort: { notificationId: -1 } }).lean();
            socket.emit("notifications", notifications)
        }

        try {
            // Buscar el ID del usuario en la base de datos usando el nombre de usuario
            const user = await User.findOne({ username })

            if (!user) {
                return;
            }

            const userId = user._id;

            // Pipeline para filtrar las notificaciones por el ID de usuario y no mostrar las notificaciones de otros usuarios dentro de las notificaciones de otro usuario
            const pipeline = [
                {
                    $match: {
                        "fullDocument.to": userId
                    }
                }
            ];

            // Crear un changeStream con el pipeline filtrado por userId
            // const changeStream = Notifications.watch(pipeline);
            const changeStream = Notifications.watch(pipeline);
            const changeStreamDelete = Notifications.watch();
            const changeStreamUpdate = Notifications.watch([], { fullDocument: 'updateLookup' });

            changeStream.on('change', (change) => {
                if (change.operationType === 'insert') {
                    const notification = change.fullDocument;
                    socket.emit('newNotification', notification);
                }
            });

            changeStreamDelete.on('change', (change) => {
                if (change.operationType === 'delete') {
                    const notificationId = change.documentKey._id;
                    socket.emit('deleteNotification', notificationId);
                }
            })

            changeStreamUpdate.on('change', (change) => {
                if (change.operationType === 'update') {
                    const notification = change.fullDocument;
                    socket.emit('updateNotification', notification);
                }
            });

            // Limpiar el changeStream cuando el socket se desconecta
            socket.on('disconnect', () => {
                changeStream.close();
            });
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
        }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
